import type { Extension } from '@tiptap/core';
import type { RicosEditorProps } from 'ricos-common';
import type {
  ExtensionAggregate,
  FunctionalExtensionAggregate,
  IFunctionalExtension,
} from './domain-types';
import { IExtensionAggregate } from './IExtensionAggregate';
import { NodeHocDecorator } from './NodeHocDecorator';

export class FunctionalExtensions implements FunctionalExtensionAggregate {
  private extensions: IExtensionAggregate<IFunctionalExtension>;

  constructor(extensions: IFunctionalExtension[]) {
    this.extensions = new IExtensionAggregate(extensions);
  }

  getNodeHocComposer(extensions: ExtensionAggregate, ricosProps: RicosEditorProps) {
    return new NodeHocDecorator(
      this.extensions.asArray().map(ex => ex.getNodeHocDescriptor(extensions, ricosProps))
    );
  }

  toTiptapExtensions(extensions: ExtensionAggregate, ricosProps: RicosEditorProps) {
    return this.extensions
      .asArray()
      .map(e => e.toTiptapExtension(extensions, ricosProps)) as Extension[];
  }

  asArray() {
    return this.extensions.asArray();
  }
}
