import { createVideoPlugin } from './createVideoPlugin';
import { VIDEO_TYPE, VideoPluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createVideoData } from './createVideoData';
import { createRicosExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'wix-tiptap-editor';

export const pluginVideo: EditorPluginCreator<VideoPluginEditorConfig> = config => {
  const pluginConfig: Record<string, unknown> = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: VIDEO_TYPE,
    createPlugin: createVideoPlugin,
    ModalsMap,
    createPluginData: createVideoData,
    configFixer: () =>
      (pluginConfig.uploadHandler =
        pluginConfig.handleFileUpload || pluginConfig.handleFileSelection),
    tiptapExtensions: createRicosExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
