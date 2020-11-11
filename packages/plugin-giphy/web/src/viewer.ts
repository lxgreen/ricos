import { typeMapper } from './typeMapper';
import { DEFAULTS } from './constants';
import { GIPHY_TYPE, GiphyPluginViewerConfig } from './types';
import { ViewerPluginFunction } from 'wix-rich-content-common';
export { typeMapper as giphyTypeMapper, GIPHY_TYPE };

export const pluginGiphy: ViewerPluginFunction<GiphyPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configViewer, ...config },
    type: GIPHY_TYPE,
    typeMapper,
  };
};
