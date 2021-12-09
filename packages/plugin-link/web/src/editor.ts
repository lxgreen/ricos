import { createLinkPlugin } from './createLinkPlugin';
import { LINK_TYPE, LinkPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createLinkData } from './createLinkData';
import { createTiptapExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'ricos-tiptap-types';

export const pluginLink: EditorPluginCreator<LinkPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: LINK_TYPE,
    createPlugin: createLinkPlugin,
    ModalsMap: {},
    createPluginData: createLinkData,
    tiptapExtensions: createTiptapExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
