import { createVerticalEmbedPlugin } from './createVerticalEmbedPlugin';
import type { VerticalEmbedPluginEditorConfig } from './types';
import { VERTICAL_EMBED_TYPE } from './types';
import { ModalsMap } from './modals';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginVerticalEmbed: EditorPluginCreator<VerticalEmbedPluginEditorConfig> = config => {
  return {
    config: { ...config },
    type: VERTICAL_EMBED_TYPE,
    createPlugin: createVerticalEmbedPlugin,
    ModalsMap,
  };
};
