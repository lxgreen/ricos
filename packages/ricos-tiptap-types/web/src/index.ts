/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  ExtensionConfig,
  MarkConfig,
  markInputRule as markInputRuleFn,
  markPasteRule as markPasteRuleFn,
  mergeAttributes as mergeAttributesFn,
  NodeConfig,
  NodeViewRendererProps,
  textblockTypeInputRule as textblockTypeInputRuleFn,
} from '@tiptap/core';
import type { NodeViewContent } from '@tiptap/react';
import type { Plugin as IPlugin, PluginKey as IPluginKey } from 'prosemirror-state';
import type { ComponentType } from 'react';
import type {
  EditorPlugin,
  LegacyEditorPluginConfig,
  LinkSettings,
  TextAlignment,
  TranslationFunction,
} from 'ricos-types';
import type { ComponentData } from 'wix-rich-content-common';

export type PluginProps = NodeViewRendererProps & {
  settings: LegacyEditorPluginConfig;
  componentData: ComponentData;
  updateAttributes: (data: unknown) => null;
  selected: boolean;
  NodeViewContent: typeof NodeViewContent;
};
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

export type Group = 'react' | 'text-container' | 'text' | 'spoilerable' | 'shortcuts-enabled';

export type RicosNodeExtension = {
  name: string;
  type: 'node';
  groups: Group[];
  settings?: Record<string, unknown>;
  reconfigure?: (
    config: NodeConfig,
    extensions: RicosExtension[],
    ricosProps: ExtensionProps,
    settings: Record<string, unknown>
  ) => NodeConfig;
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
  Component?: ComponentType<PluginProps>;
};

export type RicosMarkExtension = {
  name: string;
  type: 'mark';
  groups: Group[];
  settings?: Record<string, unknown>;
  reconfigure?: (
    config: MarkConfig,
    extensions: RicosExtension[],
    ricosProps: ExtensionProps,
    settings: Record<string, unknown>
  ) => MarkConfig;
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
};

export type RicosFunctionalExtension = {
  name: string;
  type: 'extension';
  groups: Group[];
  settings?: Record<string, unknown>;
  reconfigure?: (
    config: RicosExtensionConfig,
    extensions: RicosExtension[],
    ricosProps: ExtensionProps,
    settings: Record<string, unknown>
  ) => RicosExtensionConfig;
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

export type { DOMOutputSpec } from 'prosemirror-model';

export type ExtensionProps = {
  placeholder?: string;
  textAlignment?: TextAlignment;
  iframeSandboxDomain?: string;
  isTextWrap?: boolean;
  maxTextLength?: number;
  anchorTarget?: LinkSettings['anchorTarget'];
  relValue?: LinkSettings['relValue'];
  rel?: LinkSettings['rel'];
};

export type HtmlAttributes = {
  autoCapitalize: string;
  // explicit true/false enumeration
  spellCheck: 'true' | 'false';
  autoComplete: string;
  autoCorrect: string;
  tabIndex: number;
};

export { NodeConfig, MarkConfig };
