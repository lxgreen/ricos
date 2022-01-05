/*
  This module exports the required CreatePluginFunction for RicosViewer.
  If your plugin uses decorations, then make sure to uncomment 'decorator'.
  (Please find examples of usage in other plugins)
*/

import { typeMapper } from './typeMapper-loadable';
import type { AudioPluginViewerConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ViewerPluginCreator } from 'wix-rich-content-common';
// import { theme } from './defaults'; // Optional
export { AUDIO_TYPE, typeMapper as audioTypeMapper };

export const pluginAudio: ViewerPluginCreator<AudioPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: AUDIO_TYPE,
    typeMapper,
    // theme,
    // decorator: (theme, config) => ...
  };
};
