import React from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import { imageTypeMapper } from 'wix-rich-content-plugin-image/viewer';
import { galleryTypeMapper } from 'wix-rich-content-plugin-gallery/viewer';
import { videoTypeMapper } from 'wix-rich-content-plugin-video/viewer';
import { soundCloudTypeMapper } from 'wix-rich-content-plugin-sound-cloud/viewer';

const typeMappers = [imageTypeMapper, galleryTypeMapper, videoTypeMapper, soundCloudTypeMapper];

export default () => {
  return <RichContentViewer typeMappers={typeMappers} />;
};
