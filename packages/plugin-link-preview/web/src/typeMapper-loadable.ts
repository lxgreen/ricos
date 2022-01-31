import { LINK_PREVIEW_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';
import 'wix-rich-content-plugin-html/dist/styles.HtmlComponent.min.global.css';

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_PREVIEW_TYPE]: { component: loadable(() => import('./LinkPreviewViewer')) },
});
