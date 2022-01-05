import { createDividerPlugin } from './createDividerPlugin';
import { DEFAULTS } from './defaults';
import type { DividerPluginEditorConfig } from './types';
import { DIVIDER_TYPE } from './types';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createDividerData } from './createDividerData';
import { createTiptapExtensions } from './tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';

export const pluginDivider: EditorPluginCreator<DividerPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
    createPluginData: createDividerData,
    tiptapExtensions: createTiptapExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
