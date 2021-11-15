import { HTML_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [HTML_TYPE]: { component: loadable(() => import('./HtmlComponent')) },
});
