import { CreateExtension } from './types';
import { NodeConfig, MarkConfig, ExtensionConfig } from '@tiptap/core';

export const createMarkExtension: CreateExtension<MarkConfig> = params => ({
  type: 'mark',
  ...params,
});

export const createGenericExtension: CreateExtension<ExtensionConfig> = params => ({
  type: 'extension',
  ...params,
});

export const createNodeExtension: CreateExtension<NodeConfig> = params => ({
  type: 'node',
  ...params,
});
