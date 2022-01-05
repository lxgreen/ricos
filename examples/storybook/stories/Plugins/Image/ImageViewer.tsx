import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';

const ImageViewer: FunctionComponent<{
  content?: DraftContent;
  imageConfig?: Parameters<typeof pluginImage>[0];
}> = ({ content, imageConfig }) => (
  <RicosViewer content={content} plugins={[pluginImage(imageConfig)]} />
);

export default ImageViewer;
