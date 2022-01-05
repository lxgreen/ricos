import { LINK_PREVIEW_TYPE } from './types';
import type { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [LINK_PREVIEW_TYPE]: { component: loadable(() => import('./LinkPreviewViewer')) },
});
