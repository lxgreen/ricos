import * as ricosSchema from 'ricos-schema';
import { NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';

export type ExtensionType = 'node' | 'mark' | 'extension';

export type RicosExtension = RicosNodeExtension | RicosMarkExtension | RicosGenericExtension;

export type TiptapExtensionConfig = NodeConfig | MarkConfig | ExtensionConfig;

export interface RicosNodeExtension {
  type: 'node';
  createConfig: CreateTiptapExtensionConfig<NodeConfig>;
  Component: React.ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}
export interface RicosMarkExtension {
  type: 'mark';
  createConfig: CreateTiptapExtensionConfig<MarkConfig>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}
export interface RicosGenericExtension {
  type: 'extension';
  createConfig: CreateTiptapExtensionConfig<ExtensionConfig>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}

export type RicosTiptapExtension<T extends RicosExtension> = T;

export type CreateTiptapExtensionConfig<T extends Partial<TiptapExtensionConfig>> = (core: {
  mergeAttributes: typeof mergeAttributes;
}) => T;
