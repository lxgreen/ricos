import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';

import { pluginLinkPreview } from 'wix-rich-content-plugin-link-preview/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';

const plugins = [pluginLinkPreview({ enableEmbed: true }), pluginLink()];

const LinkPreviewViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default LinkPreviewViewer;
