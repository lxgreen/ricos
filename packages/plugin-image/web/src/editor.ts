import { createImagePlugin } from './createImagePlugin';
import { IMAGE_TYPE, ImagePluginEditorConfig } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './consts';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createImageData } from './createImageData';
import { createRicosExtensions } from './tiptap';

export const pluginImage: EditorPluginCreator<ImagePluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: IMAGE_TYPE,
    createPlugin: createImagePlugin,
    ModalsMap,
    createPluginData: createImageData,
    tiptapExtensions: createRicosExtensions(pluginConfig),
  };
};
