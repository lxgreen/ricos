import { Extension } from '@tiptap/core';
import { and, firstRight } from 'ricos-content';
import { not } from 'fp-ts/Predicate';
import {
  ExtensionAggregate,
  IExtension,
  IFunctionalExtension,
  IMarkExtension,
  IReactNodeExtension,
  IHtmlNodeExtension,
} from './domain-types';
import {
  isRicosFunctionalExtension,
  isRicosMarkExtension,
  isRicosNodeExtension,
  RicosExtension,
  RicosNodeExtension,
} from 'ricos-tiptap-types';
import { FunctionalExtension } from './FunctionalExtension';
import { FunctionalExtensions } from './FunctionalExtensions';
import { IExtensionAggregate } from './IExtensionAggregate';
import { MarkExtension } from './MarkExtension';
import { MarkExtensions } from './MarkExtensions';
import { ReactNodeExtension, HtmlNodeExtension } from './NodeExtension';
import { ReactNodeExtensions, HtmlNodeExtensions } from './NodeExtensions';

const defaultIExtension = {
  toTiptapExtension: Extension.create,
};

const hasComponentConfig = (ext: RicosNodeExtension): boolean => !!ext.Component;

const toIExtension = (ext: RicosExtension): IExtension =>
  firstRight(ext, defaultIExtension as IExtension, [
    [and([isRicosNodeExtension, hasComponentConfig]), () => new ReactNodeExtension(ext)],
    [and([isRicosNodeExtension, not(hasComponentConfig)]), () => new HtmlNodeExtension(ext)],
    [isRicosMarkExtension, () => new MarkExtension(ext)],
    [isRicosFunctionalExtension, () => new FunctionalExtension(ext)],
  ]);

const validate = (extensions: IExtension[]) => {
  const names = extensions.map(e => e.name);
  const duplicateNames = names
    .map(name => ({ name, duplicate: names.indexOf(name) !== names.lastIndexOf(name) }))
    .filter(({ duplicate }) => !!duplicate)
    .map(({ name }) => name);
  if (duplicateNames.length > 0) {
    throw new NameCollisionError(`Extension name collision: ${duplicateNames.join(' ,')}`);
  }
};

class NameCollisionError extends Error {}

/**
 * Extensions is an aggregate over Extension entities.
 * It provides filtering and sorting functionalities which are relevant only in context of multiple Extension instances.
 * The specific Extensions subtypes are NodeExtensions, MarkExtensions and FunctionalExtensions.
 * They rely on filtering and constructed internally by the Extensions.
 */
export class Extensions implements ExtensionAggregate {
  private extensions: IExtensionAggregate<IExtension>;

  private constructor(extensions: IExtension[]) {
    this.extensions = new IExtensionAggregate<IExtension>(extensions);
  }

  static of(extensions: RicosExtension[]) {
    const iExtensions = extensions.map(toIExtension);
    validate(iExtensions);
    return new Extensions(iExtensions);
  }

  getFunctionalExtensions() {
    return new FunctionalExtensions(
      this.extensions.filter(ext => ext.type === 'extension').asArray() as IFunctionalExtension[]
    );
  }

  getReactNodeExtensions() {
    return new ReactNodeExtensions(
      this.extensions.filter(ext => ext.type === 'react-node').asArray() as IReactNodeExtension[]
    );
  }

  getHtmlNodeExtensions() {
    return new HtmlNodeExtensions(
      this.extensions.filter(ext => ext.type === 'html-node').asArray() as IHtmlNodeExtension[]
    );
  }

  getMarkExtensions() {
    return new MarkExtensions(
      this.extensions.filter(ext => ext.type === 'mark').asArray() as IMarkExtension[]
    );
  }

  getDecoratedNodeExtensions() {
    const hocComposer = this.getFunctionalExtensions().getNodeHocComposer();
    return this.getReactNodeExtensions().getDecoratedNodeExtensions(hocComposer);
  }

  getTiptapExtensions() {
    const reactNodes = this.getDecoratedNodeExtensions().toTiptapExtensions();
    const htmlNodes = this.getHtmlNodeExtensions().toTiptapExtensions();
    const marks = this.getMarkExtensions().toTiptapExtensions();
    const extensions = this.getFunctionalExtensions().toTiptapExtensions();
    return [...extensions, ...marks, ...reactNodes, ...htmlNodes];
  }

  concat(extensions: RicosExtension[]): Extensions {
    const iExtensions = extensions.map(toIExtension);
    validate(iExtensions);
    return new Extensions(this.extensions.asArray().concat(iExtensions));
  }
}
