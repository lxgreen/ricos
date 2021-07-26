import { POLL_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [POLL_TYPE]: {
    component: loadable(() => import('./components/PollViewer')),
  },
});
