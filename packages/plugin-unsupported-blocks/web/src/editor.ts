import { createUnsupportedBlocksPlugin } from './createUnsupportedBlocksPlugin';
import { UnsupportedBlocksPluginEditorConfig } from './types';
import { UNSUPPORTED_BLOCKS_TYPE } from 'wix-rich-content-plugin-commons';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginUnsupportedBlocks: EditorPluginCreator<UnsupportedBlocksPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: UNSUPPORTED_BLOCKS_TYPE,
    createPlugin: createUnsupportedBlocksPlugin,
  };
};
