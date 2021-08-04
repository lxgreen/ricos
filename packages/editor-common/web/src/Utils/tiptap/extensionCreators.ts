import { CreateExtension } from './types';
import { NodeConfig, MarkConfig, ExtensionConfig } from '@tiptap/core';
import { PluginProps } from '../..';

export interface RicosExtensionConfig extends ExtensionConfig {
  addNodeViewHOC?: () => {
    nodeTypes: string[];
    nodeViewHOC: (Component: React.ComponentType) => React.ComponentType<PluginProps>;
  };
}

export const createNodeExtension: CreateExtension<NodeConfig> = params => ({
  type: 'node',
  ...params,
});

export const createMarkExtension: CreateExtension<MarkConfig> = params => ({
  type: 'mark',
  ...params,
});

export const createGenericExtension: CreateExtension<RicosExtensionConfig> = params => ({
  type: 'extension',
  ...params,
});
