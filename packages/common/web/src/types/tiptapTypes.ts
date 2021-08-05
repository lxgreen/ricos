/* eslint-disable @typescript-eslint/no-explicit-any */
import * as ricosSchema from 'ricos-schema';
import { NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';

export type ExtensionType = 'node' | 'mark' | 'extension';

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
  createConfig: CreateTiptapExtensionConfig<NodeConfig>;
  Component: React.ComponentType;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}
export interface RicosMarkExtensionConfig {
  type: 'mark';
  createConfig: CreateTiptapExtensionConfig<MarkConfig>;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}
export interface RicosExtensionConfig {
  type: 'extension';
  createConfig: CreateTiptapExtensionConfig<ExtensionConfig>;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}

export type CreateTiptapExtensionConfig<
  T extends Partial<NodeConfig | MarkConfig | ExtensionConfig>
> = (core: { mergeAttributes: typeof mergeAttributes }) => T;
