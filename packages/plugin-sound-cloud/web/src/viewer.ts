import { typeMapper } from './typeMapper';
import type { SoundCloudPluginViewerConfig } from './types';
import { SOUND_CLOUD_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as soundCloudTypeMapper, SOUND_CLOUD_TYPE };

export const pluginSoundCloud: ViewerPluginCreator<SoundCloudPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: SOUND_CLOUD_TYPE,
    typeMapper,
  };
};
