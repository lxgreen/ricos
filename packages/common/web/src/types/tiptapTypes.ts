import { NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';
export type TiptapExtensionConfig = NodeConfig | MarkConfig | ExtensionConfig;
export interface RicosTiptapExtension<T extends TiptapExtensionConfig> {
  type: 'node' | 'mark' | 'extension';
  createConfig: CreateTiptapExtensionConfig<T>;
  Component?: React.ComponentType;
}

export type CreateTiptapExtensionConfig<T extends Partial<TiptapExtensionConfig>> = (core: {
  mergeAttributes: typeof mergeAttributes;
}) => T;
