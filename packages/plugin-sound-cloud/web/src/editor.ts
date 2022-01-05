import { createSoundCloudPlugin } from './createSoundCloudPlugin';
import type { SoundCloudPluginEditorConfig } from './types';
import { SOUND_CLOUD_TYPE } from './types';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginSoundCloud: EditorPluginCreator<SoundCloudPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SOUND_CLOUD_TYPE,
    createPlugin: createSoundCloudPlugin,
    ModalsMap,
  };
};
