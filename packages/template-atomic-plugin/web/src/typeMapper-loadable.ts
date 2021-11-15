import { YOUR_PLUGIN_NAME_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [YOUR_PLUGIN_NAME_TYPE]: { component: loadable(() => import('./yourDpluginDname-viewer')) },
});
