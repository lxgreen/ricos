import { createGiphyPlugin } from './createGiphyPlugin';
import { ModalsMap } from './modals';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE, GiphyPluginEditorConfig } from './types';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createGiphyData } from './createGiphyData';
import { createRicosExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'wix-tiptap-editor';

export const pluginGiphy: EditorPluginCreator<GiphyPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: GIPHY_TYPE,
    createPlugin: createGiphyPlugin,
    ModalsMap,
    createPluginData: createGiphyData,
    tiptapExtensions: createRicosExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
