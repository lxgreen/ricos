import { Extension } from '@tiptap/core';
import { FunctionalExtensionAggregate, IFunctionalExtension } from './domain-types';
import { IExtensionAggregate } from './IExtensionAggregate';
import { NodeHocDecorator } from './NodeHocDecorator';

export class FunctionalExtensions implements FunctionalExtensionAggregate {
  private extensions: IExtensionAggregate<IFunctionalExtension>;

  constructor(extensions: IFunctionalExtension[]) {
    this.extensions = new IExtensionAggregate(extensions);
  }

  getNodeHocComposer() {
    return new NodeHocDecorator(this.extensions.asArray().map(ex => ex.getNodeHocDescriptor()));
  }

  toTiptapExtensions() {
    return this.extensions.asArray().map(e => e.toTiptapExtension()) as Extension[];
  }
}
