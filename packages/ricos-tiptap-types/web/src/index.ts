/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ExtensionConfig,
  MarkConfig,
  mergeAttributes as mergeAttributesFn,
  markPasteRule as markPasteRuleFn,
  markInputRule as markInputRuleFn,
  textblockTypeInputRule as textblockTypeInputRuleFn,
  NodeConfig,
  NodeViewRendererProps,
} from '@tiptap/core';
import type { Plugin as IPlugin, PluginKey as IPluginKey } from 'prosemirror-state';
import type { ComponentType } from 'react';
import type {
  TranslationFunction,
  EditorPlugin,
  LegacyEditorPluginConfig,
} from 'wix-rich-content-common';

export type RicosNodeProps = NodeViewRendererProps &
  RicosTiptapContextValue & {
    componentData: NodeViewRendererProps['node']['attrs'];
  };

export type TiptapExtensionConfig = NodeConfig | MarkConfig | RicosExtensionConfig;

export const isNodeConfig = (c: TiptapExtensionConfig): c is NodeConfig => c.type === 'node';
export const isMarkConfig = (c: TiptapExtensionConfig): c is MarkConfig => c.type === 'mark';
export const isExtensionConfig = (c: TiptapExtensionConfig): c is RicosExtensionConfig =>
  c.type === 'extension';

export type NodeHoc<T = any> = (Component: ComponentType<T>) => ComponentType<T>;

export type NodeViewHocMap = {
  [type: string]: NodeHoc[];
};

export type RicosTiptapContextValue = {
  context: {
    t?: TranslationFunction;
  };
};

export interface RicosExtensionConfig extends ExtensionConfig {
  addNodeHoc?: () => NodeHocDescriptor;
}

export type NodeHocDescriptor = {
  nodeTypes: string[];
  nodeHoc: NodeHoc;
  priority: number;
};

export type RicosNodeExtension = {
  type: 'node';
  createExtensionConfig: ({
    textblockTypeInputRule,
    mergeAttributes,
    markPasteRule,
    markInputRule,
    Plugin,
    PluginKey,
  }: {
    textblockTypeInputRule: typeof textblockTypeInputRuleFn;
    mergeAttributes: typeof mergeAttributesFn;
    markPasteRule: typeof markPasteRuleFn;
    markInputRule: typeof markInputRuleFn;
    Plugin: typeof IPlugin;
    PluginKey: typeof IPluginKey;
  }) => NodeConfig;
  Component?: ComponentType;
  componentDataDefaults?: any;
};

export type RicosMarkExtension = {
  type: 'mark';
  createExtensionConfig: ({
    textblockTypeInputRule,
    mergeAttributes,
    markPasteRule,
    markInputRule,
    Plugin,
    PluginKey,
  }: {
    textblockTypeInputRule: typeof textblockTypeInputRuleFn;
    mergeAttributes: typeof mergeAttributesFn;
    markPasteRule: typeof markPasteRuleFn;
    markInputRule: typeof markInputRuleFn;
    Plugin: typeof IPlugin;
    PluginKey: typeof IPluginKey;
  }) => MarkConfig;
  componentDataDefaults?: any;
};

export type RicosFunctionalExtension = {
  type: 'extension';
  createExtensionConfig: ({
    mergeAttributes,
  }: {
    mergeAttributes: typeof mergeAttributesFn;
  }) => RicosExtensionConfig;
};

export const isRicosNodeExtension = (ext: RicosExtension): ext is RicosNodeExtension =>
  ext.type === 'node';
export const isRicosMarkExtension = (ext: RicosExtension): ext is RicosMarkExtension =>
  ext.type === 'mark';
export const isRicosFunctionalExtension = (ext: RicosExtension): ext is RicosFunctionalExtension =>
  ext.type === 'extension';

export type RicosExtension = RicosNodeExtension | RicosMarkExtension | RicosFunctionalExtension;

export interface TiptapEditorPlugin extends EditorPlugin {
  tiptapExtensions: RicosExtension[];
}

export type CreateRicosExtensions = <PluginType extends keyof LegacyEditorPluginConfig>(
  config: LegacyEditorPluginConfig[PluginType]
) => RicosExtension[];

export type { DOMOutputSpec } from 'prosemirror-model';
