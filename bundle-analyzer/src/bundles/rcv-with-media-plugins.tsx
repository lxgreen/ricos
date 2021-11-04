import { createViewerBundle } from '../createViewerBundle';
import 'wix-rich-content-plugin-commons/dist/styles.min.css';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import 'wix-rich-content-plugin-image/dist/styles.min.css';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import 'wix-rich-content-plugin-gallery/dist/styles.min.css';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import 'wix-rich-content-plugin-video/dist/styles.min.css';
import { pluginSoundCloud } from 'wix-rich-content-plugin-sound-cloud/viewer';
import 'wix-rich-content-plugin-sound-cloud/dist/styles.min.css';

export default () =>
  createViewerBundle([pluginImage(), pluginGallery(), pluginVideo(), pluginSoundCloud()]);
