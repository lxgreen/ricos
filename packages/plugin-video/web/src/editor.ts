import { createVideoPlugin } from './createVideoPlugin';
import type { VideoPluginEditorConfig } from './types';
import { VIDEO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createVideoData } from './createVideoData';
import { createRicosExtensions } from './tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';

export const pluginVideo: EditorPluginCreator<VideoPluginEditorConfig> = config => {
  const pluginConfig: VideoPluginEditorConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: VIDEO_TYPE,
    createPlugin: createVideoPlugin,
    ModalsMap,
    createPluginData: createVideoData,
    tiptapExtensions: createRicosExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
