import * as ricosSchema from 'ricos-schema';
import {
  NodeConfig,
  ExtensionConfig,
  MarkConfig,
  mergeAttributes as mergeAttributesFn,
} from '@tiptap/core';
import { ComponentType } from 'react';
import { TranslationFunction } from './commonTypes';
import { EditorPluginConfig } from './pluginTypes';

export type TiptapExtensionConfig = NodeConfig | MarkConfig | RicosExtensionConfig;

export const isNodeConfig = (c: TiptapExtensionConfig): c is NodeConfig => c.type === 'node';
export const isMarkConfig = (c: TiptapExtensionConfig): c is MarkConfig => c.type === 'mark';
export const isExtensionConfig = (c: TiptapExtensionConfig): c is RicosExtensionConfig =>
  c.type === 'extension';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type NodeViewHoc<T = any> = (Component: ComponentType<T>) => ComponentType<T>;

export type NodeViewHocMap = {
  [type: string]: NodeViewHoc[];
};

export type RicosTiptapContextValue = {
  nodeViewsHOCs: NodeViewHocMap;
  context: {
    config: Record<string, EditorPluginConfig>;
    t: TranslationFunction;
  };
};

export interface RicosExtensionConfig extends ExtensionConfig {
  addNodeViewHOC?: () => {
    nodeTypes: string[];
    nodeViewHOC: NodeViewHoc;
  };
}

export type RicosNodeExtension = {
  type: 'node';
  createConfig: ({ mergeAttributes }: { mergeAttributes: typeof mergeAttributesFn }) => NodeConfig;
  Component: React.ComponentType;
  createComponentDataDefaults?: <DT>(schema: typeof ricosSchema) => Record<string, DT>;
};

export type RicosMarkExtension = {
  type: 'mark';
  createConfig: ({ mergeAttributes }: { mergeAttributes: typeof mergeAttributesFn }) => MarkConfig;
  createComponentDataDefaults?: <DT>(schema: typeof ricosSchema) => Record<string, DT>;
};

export type RicosGenericExtension = {
  type: 'extension';
  createConfig: ({
    mergeAttributes,
  }: {
    mergeAttributes: typeof mergeAttributesFn;
  }) => RicosExtensionConfig;
  createComponentDataDefaults?: <DT>(schema: typeof ricosSchema) => Record<string, DT>;
};

export const isRicosNodeExtension = (ext: RicosTiptapExtension): ext is RicosNodeExtension =>
  ext.type === 'node';
export const isRicosMarkExtension = (ext: RicosTiptapExtension): ext is RicosMarkExtension =>
  ext.type === 'mark';
export const isRicosGenericExtension = (ext: RicosTiptapExtension): ext is RicosGenericExtension =>
  ext.type === 'extension';

export type RicosTiptapExtension = RicosNodeExtension | RicosMarkExtension | RicosGenericExtension;
