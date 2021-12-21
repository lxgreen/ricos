import { createMapPlugin } from './createMapPlugin';
import { DEFAULTS } from './defaults';
import { MAP_TYPE, MapPluginEditorConfig } from './types';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createMapData } from './createMapData';

export const pluginMap: EditorPluginCreator<MapPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: MAP_TYPE,
    createPlugin: createMapPlugin,
    ModalsMap: {},
    createPluginData: createMapData,
  };
};
