import { createLinkPreviewPlugin } from './createLinkPreviewPlugin';
import { LINK_PREVIEW_TYPE, LinkPreviewPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createRicosExtensions } from './tiptap';

export const pluginLinkPreview: EditorPluginCreator<LinkPreviewPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: LINK_PREVIEW_TYPE,
    createPlugin: createLinkPreviewPlugin,
    ModalsMap: {},
    tiptapExtensions: createRicosExtensions(pluginConfig),
  };
};
