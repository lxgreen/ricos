import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import { pluginVideo } from 'wix-rich-content-plugin-video/viewer';
import { pluginAudio } from 'wix-rich-content-plugin-audio/viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginGallery } from 'wix-rich-content-plugin-gallery/viewer';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload/viewer';
import { pluginTable } from 'wix-rich-content-plugin-table/dist/module.viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/dist/module.viewer';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

function getPlugins() {
  return [
    pluginImage(),
    pluginVideo(),
    pluginAudio(),
    pluginGallery(),
    pluginFileUpload(),
    pluginTable(),
    pluginTextColor(),
    pluginTextHighlight(),
    pluginLineSpacing(),
    pluginCollapsibleList(),
  ];
}

const MediaViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer plugins={getPlugins()} content={content} />
);

export default MediaViewer;
