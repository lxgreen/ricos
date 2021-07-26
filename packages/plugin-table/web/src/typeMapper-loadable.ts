import loadable from '@loadable/component';
import { TABLE_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';

export const typeMapper: PluginTypeMapper = () => ({
  [TABLE_TYPE]: { component: loadable(() => import('./table-viewer')), withHorizontalScroll: true },
});
