import { videoTypeMapper } from 'wix-rich-content-plugin-video/dist/module.viewer.cjs';
import createViewerBundle from './RichContentViewerWrapper';

export default () => createViewerBundle(videoTypeMapper);
