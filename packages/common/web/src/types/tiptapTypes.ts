/* eslint-disable @typescript-eslint/no-explicit-any */
import { onAtomicBlockFocus } from './commonTypes';
import * as ricosSchema from 'ricos-schema';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { LegacyEditorPluginConfig } from '..';
import { AnyConfig, NodeConfig, MarkConfig, ExtensionConfig, mergeAttributes } from '@tiptap/core';

// TODO: Move this file to editor-common

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
    nodeViewHOC: (
      Component: React.ComponentType<TiptapPluginProps>
    ) => React.ComponentType<TiptapPluginProps>;
  };
}

export interface TiptapPluginProps extends Record<string, any> {
  context: {
    isMobile: boolean;
    theme: string;
    t: (key: string) => string;
    config: LegacyEditorPluginConfig;
    onAtomicBlockFocus?: onAtomicBlockFocus;
  };
  // eslint-disable-next-line
  componentData: any;
  isFocused: boolean;
  node: ProseMirrorNode;
  editorCommands: unknown;
  updateAttributes: (data: unknown) => null;
}
