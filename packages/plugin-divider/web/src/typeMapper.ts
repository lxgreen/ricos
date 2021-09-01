import DividerComponent from './components/divider-component';
import { DIVIDER_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import { sizeClassName } from './classNameStrategies';

export const typeMapper: PluginTypeMapper = () => ({
  [DIVIDER_TYPE]: { component: DividerComponent, classNameStrategies: { size: sizeClassName } },
});
