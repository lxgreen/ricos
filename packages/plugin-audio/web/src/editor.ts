import { createAudioData } from './createAudioData';

import { createAudioPlugin } from './createAudioPlugin';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginAudio: EditorPluginCreator<AudioPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: AUDIO_TYPE,
    createPlugin: createAudioPlugin,
    createPluginData: createAudioData,
  };
};
