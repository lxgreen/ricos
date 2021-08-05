/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ricosSchema from 'ricos-schema';
import { AnyConfig, NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';
import { PluginProps } from 'wix-rich-content-editor-common';

/**
 * Following `AnyExtension` terminology
 * https://github.com/ueberdosis/tiptap/blob/d720edbe2421aa18a2e568bba63622165207c983/packages/core/src/types.ts#L25-L26
 */
export type RicosAnyExtensionConfig =
  | RicosNodeExtensionConfig
  | RicosMarkExtensionConfig
  | RicosExtensionConfig;

export interface RicosNodeExtensionConfig {
  type: 'node';
  createConfig: CreateAnyExtensionConfig<NodeConfig>;
  Component: React.ComponentType;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}
export interface RicosMarkExtensionConfig {
  type: 'mark';
  createConfig: CreateAnyExtensionConfig<MarkConfig>;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}
export interface RicosExtensionConfig {
  type: 'extension';
  createConfig: CreateAnyExtensionConfig<CustomExtensionConfig>;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}

export type CreateAnyExtensionConfig<T extends AnyConfig> = (core: {
  mergeAttributes: typeof mergeAttributes;
}) => T;

interface CustomExtensionConfig extends ExtensionConfig {
  addNodeViewHOC?: () => {
    nodeTypes: string[];
    nodeViewHOC: (Component: React.ComponentType) => React.ComponentType<PluginProps>;
  };
}
