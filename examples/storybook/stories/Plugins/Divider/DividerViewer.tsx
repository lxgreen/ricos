import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/dist/module.viewer';

const DividerViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginDivider()]} />
);

export default DividerViewer;
