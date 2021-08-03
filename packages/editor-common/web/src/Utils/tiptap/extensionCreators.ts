import { RicosTiptapExtension, TiptapExtensionConfig } from 'wix-rich-content-common';
import { CreateExtension, CreateExtensionParams } from './types';
import { NodeConfig, MarkConfig, ExtensionConfig } from '@tiptap/core';

const createNodeExtension: CreateExtension<NodeConfig> = params => ({
  type: 'node',
  ...params,
});

const createMarkExtension: CreateExtension<MarkConfig> = params => ({
  type: 'mark',
  ...params,
});

const createGenericExtension: CreateExtension<ExtensionConfig> = params => ({
  type: 'extension',
  ...params,
});

export class ExtensionBuilder {
  // eslint-disable-next-line prettier/prettier
  #extensions: RicosTiptapExtension<TiptapExtensionConfig>[] = [];

  addNode(params: CreateExtensionParams<NodeConfig>) {
    this.#extensions.push(createNodeExtension(params));
    return this;
  }

  addMark(params: CreateExtensionParams<MarkConfig>) {
    this.#extensions.push(createMarkExtension(params));
    return this;
  }

  addGeneric(params: CreateExtensionParams<ExtensionConfig>) {
    this.#extensions.push(createGenericExtension(params));
    return this;
  }

  build() {
    return this.#extensions;
  }
}
