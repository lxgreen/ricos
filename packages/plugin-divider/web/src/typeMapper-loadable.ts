import { DIVIDER_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import { sizeClassName } from './classNameStrategies';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [DIVIDER_TYPE]: {
    component: loadable(() => import('./divider-component')),
    classNameStrategies: { size: sizeClassName },
  },
});
