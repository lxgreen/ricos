import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/viewer';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color/viewer';

const CollapsibleListViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer
    content={content}
    plugins={[pluginCollapsibleList(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
  />
);

export default CollapsibleListViewer;
