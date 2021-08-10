/* eslint-disable @typescript-eslint/no-explicit-any */
import { AugmentedRequired } from 'utility-types/dist/mapped-types';
import * as ricosSchema from 'ricos-schema';
import {
  NodeConfig,
  ExtensionConfig,
  MarkConfig,
  mergeAttributes as mergeAttributesFn,
} from '@tiptap/core';
import { ComponentType } from 'react';
import { TranslationFunction } from './commonTypes';
import { EditorPluginConfig, LegacyEditorPluginConfig } from './pluginTypes';

export type TiptapExtensionConfig = NodeConfig | MarkConfig | RicosExtensionConfig;

export const isNodeConfig = (c: TiptapExtensionConfig): c is NodeConfig => c.type === 'node';
export const isMarkConfig = (c: TiptapExtensionConfig): c is MarkConfig => c.type === 'mark';
export const isExtensionConfig = (c: TiptapExtensionConfig): c is RicosExtensionConfig =>
  c.type === 'extension';

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
  createExtensionConfig: ({
    mergeAttributes,
  }: {
    mergeAttributes: typeof mergeAttributesFn;
  }) => NodeConfig;
  Component: React.ComponentType;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => any;
};

export type RicosMarkExtension = {
  type: 'mark';
  createExtensionConfig: ({
    mergeAttributes,
  }: {
    mergeAttributes: typeof mergeAttributesFn;
  }) => MarkConfig;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => any;
};

export type RicosFunctionalExtension = {
  type: 'extension';
  createExtensionConfig: ({
    mergeAttributes,
  }: {
    mergeAttributes: typeof mergeAttributesFn;
  }) => RicosExtensionConfig;
  createComponentDataDefaults?: (schema: typeof ricosSchema) => any;
};

export const isRicosNodeExtension = (ext: RicosTiptapExtension): ext is RicosNodeExtension =>
  ext.type === 'node';
export const isRicosMarkExtension = (ext: RicosTiptapExtension): ext is RicosMarkExtension =>
  ext.type === 'mark';
export const isRicosFunctionalExtension = (
  ext: RicosTiptapExtension
): ext is RicosFunctionalExtension => ext.type === 'extension';

export type RicosTiptapExtension =
  | RicosNodeExtension
  | RicosMarkExtension
  | RicosFunctionalExtension;

export type CreateRicosExtensions = <PluginType extends keyof LegacyEditorPluginConfig>(
  config: LegacyEditorPluginConfig[PluginType]
) => RicosTiptapExtension[];
