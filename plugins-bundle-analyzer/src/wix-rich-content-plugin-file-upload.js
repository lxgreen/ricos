import { fileUploadTypeMapper } from 'wix-rich-content-plugin-file-upload/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(fileUploadTypeMapper);
