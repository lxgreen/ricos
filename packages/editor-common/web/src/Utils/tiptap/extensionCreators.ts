import { CreateExtension } from './types';
import { ExtensionConfig } from '@tiptap/core';
import { PluginProps } from '../..';

export interface RicosExtensionConfig extends ExtensionConfig {
  addNodeViewHOC?: () => {
    nodeTypes: string[];
    nodeViewHOC: (Component: React.ComponentType) => React.ComponentType<PluginProps>;
  };
}

export const createNodeExtension: CreateExtension<'node'> = params => ({
  type: 'node',
  ...params,
});

export const createMarkExtension: CreateExtension<'mark'> = params => ({
  type: 'mark',
  ...params,
});

export const createGenericExtension: CreateExtension<'extension'> = params => ({
  type: 'extension',
  ...params,
});
