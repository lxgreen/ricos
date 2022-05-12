import { createDividerPlugin } from './createDividerPlugin';
import { DEFAULTS } from './defaults';
import type { DividerPluginEditorConfig } from './types';
import { DIVIDER_TYPE } from './types';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createDividerData } from './createDividerData';
import { tiptapExtensions } from './tiptap/tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';
import { getAddButtons } from './getAddButtons';

export const pluginDivider: EditorPluginCreator<DividerPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: DIVIDER_TYPE,
    createPlugin: createDividerPlugin,
    ModalsMap: {},
    createPluginData: createDividerData,
    tiptapExtensions,
    addButtons: getAddButtons(),
  } as TiptapEditorPlugin;
};
