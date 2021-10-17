import { Mark } from '@tiptap/core';
import { IMarkExtension, MarkExtensionAggregate } from './domain-types';
import { IExtensionAggregate } from './IExtensionAggregate';

export class MarkExtensions implements MarkExtensionAggregate {
  private extensions: IExtensionAggregate<IMarkExtension>;

  constructor(extensions: IMarkExtension[]) {
    this.extensions = new IExtensionAggregate(extensions);
  }

  toTiptapExtensions() {
    return this.extensions.asArray().map(e => e.toTiptapExtension()) as Mark[];
  }
}
