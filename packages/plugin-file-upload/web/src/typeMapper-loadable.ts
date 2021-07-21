import { FILE_UPLOAD_TYPE } from './types';
import { PluginTypeMapper } from 'wix-rich-content-common';
import loadable from '@loadable/component';

export const typeMapper: PluginTypeMapper = () => ({
  [FILE_UPLOAD_TYPE]: {
    component: loadable(() => import('./file-upload-viewer')),
  },
});
