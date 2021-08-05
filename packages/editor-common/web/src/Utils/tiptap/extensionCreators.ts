import {
  RicosExtensionConfig,
  RicosMarkExtensionConfig,
  RicosNodeExtensionConfig,
} from 'wix-rich-content-common';
import { CreateExtension } from './types';
import { ExtensionConfig } from '@tiptap/core';
import { PluginProps } from '../..';

export interface RicosGenericExtensionConfig extends ExtensionConfig {
  addNodeViewHOC?: () => {
    nodeTypes: string[];
    nodeViewHOC: (Component: React.ComponentType) => React.ComponentType<PluginProps>;
  };
}

export const createNodeExtension: CreateExtension<RicosNodeExtensionConfig> = params => ({
  type: 'node',
  ...params,
});

export const createMarkExtension: CreateExtension<RicosMarkExtensionConfig> = params => ({
  type: 'mark',
  ...params,
});

export const createGenericExtension: CreateExtension<RicosExtensionConfig> = params => ({
  type: 'extension',
  ...params,
});
