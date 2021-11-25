import { Node } from '@tiptap/core';
import {
  DecoratedNodeExtension,
  DecoratedNodeExtensionAggregate,
  INodeExtension,
  NodeExtensionAggregate,
  NodeHocComposer,
} from './domain-types';
import { IExtensionAggregate } from './IExtensionAggregate';

export class NodeExtensions implements NodeExtensionAggregate {
  private extensions: IExtensionAggregate<INodeExtension>;

  constructor(extensions: INodeExtension[]) {
    this.extensions = new IExtensionAggregate(extensions);
  }

  getDecoratedNodeExtensions(hocComposer: NodeHocComposer) {
    return new DecoratedNodeExtensions(
      this.extensions.asArray().map(ex => hocComposer.decorate(ex))
    );
  }
}

export class DecoratedNodeExtensions implements DecoratedNodeExtensionAggregate {
  private extensions: IExtensionAggregate<DecoratedNodeExtension>;

  constructor(extensions: DecoratedNodeExtension[]) {
    this.extensions = new IExtensionAggregate(extensions);
  }

  toTiptapExtensions() {
    return this.extensions.asArray().map(e => e.toTiptapExtension()) as Node[];
  }
}
