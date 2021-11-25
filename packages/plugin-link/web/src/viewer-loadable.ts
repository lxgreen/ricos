import { LINK_TYPE, LinkPluginViewerConfig } from './types';
import { typeMapper } from './typeMapper-loadable';
import { DEFAULTS } from './defaults';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { typeMapper as linkTypeMapper, LINK_TYPE };

export const pluginLink: ViewerPluginCreator<LinkPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINK_TYPE,
    typeMapper,
  };
};
