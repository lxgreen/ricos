import { createUnsupportedBlocksPlugin } from './createUnsupportedBlocksPlugin';
import { UnsupportedBlocksPluginEditorConfig } from './types';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createRicosExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'wix-tiptap-editor';

export const pluginUnsupportedBlocks: EditorPluginCreator<UnsupportedBlocksPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: UNSUPPORTED_BLOCKS_TYPE,
    createPlugin: createUnsupportedBlocksPlugin,
    tiptapExtensions: createRicosExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
