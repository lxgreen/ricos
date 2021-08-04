import * as ricosSchema from 'ricos-schema';
import { NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';
export type TiptapExtensionConfig = NodeConfig | MarkConfig | ExtensionConfig;
export interface ExtensionTypeToConfig {
  node: NodeConfig;
  mark: MarkConfig;
  extension: ExtensionConfig;
}

export type ExtensionType = 'node' | 'mark' | 'extension';

interface RicosTiptapExtensionBasics<T extends ExtensionType> {
  type: T;
  createConfig: CreateTiptapExtensionConfig<ExtensionTypeToConfig[T]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  createComponentDataDefaults?: (schema: typeof ricosSchema) => Record<string, any>;
}

interface RicosTiptapExtensionBasicsWithComponent<T extends ExtensionType>
  extends RicosTiptapExtensionBasics<T> {
  Component: React.ComponentType;
}

export type RicosTiptapExtension<T extends ExtensionType> = T extends 'node'
  ? RicosTiptapExtensionBasicsWithComponent<T>
  : RicosTiptapExtensionBasics<T>;

export type CreateTiptapExtensionConfig<T extends Partial<TiptapExtensionConfig>> = (core: {
  mergeAttributes: typeof mergeAttributes;
}) => T;
