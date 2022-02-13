/*
  This module exports the required CreatePluginFunction for RicosEditor.
  If your plugin uses a modal, then make sure to uncomment 'ModalsMap'.
*/

import { createAudioPlugin } from './createAudioPlugin';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
// import { ModalsMap } from './modals'; // Optional
// import { theme } from './defaults'; // Optional
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginAudio: EditorPluginCreator<AudioPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: AUDIO_TYPE,
    createPlugin: createAudioPlugin,
    // ModalsMap,
    // theme,
  };
};
