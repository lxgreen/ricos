import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginDivider } from 'wix-rich-content-plugin-divider/viewer';

const DividerViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={[pluginDivider()]} />
);

export default DividerViewer;
