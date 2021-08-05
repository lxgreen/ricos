import * as ricosSchema from 'ricos-schema';
import { NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';
export type TiptapExtensionConfig = NodeConfig | MarkConfig | ExtensionConfig;
export interface RicosTiptapExtension<T extends TiptapExtensionConfig> {
  type: 'node' | 'mark' | 'extension';
  Component?: React.ComponentType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
  createConfig: CreateTiptapExtensionConfig<T>;
}

export type CreateTiptapExtensionConfig<T extends Partial<TiptapExtensionConfig>> = (core: {
  mergeAttributes: typeof mergeAttributes;
}) => T;
