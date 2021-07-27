import { VERTICAL_EMBED_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [VERTICAL_EMBED_TYPE]: {
    component: loadable(() => import('./components/vertical-embed-component')),
  },
});
