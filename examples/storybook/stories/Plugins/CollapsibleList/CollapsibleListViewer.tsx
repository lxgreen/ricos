import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-viewer';
import { RicosViewer } from 'ricos-viewer';
import { pluginCollapsibleList } from 'wix-rich-content-plugin-collapsible-list/dist/module.viewer';
import { pluginLink } from 'wix-rich-content-plugin-link/dist/module.viewer';
import {
  pluginTextColor,
  pluginTextHighlight,
} from 'wix-rich-content-plugin-text-color/dist/module.viewer';

const CollapsibleListViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer
    content={content}
    plugins={[pluginCollapsibleList(), pluginLink(), pluginTextColor(), pluginTextHighlight()]}
  />
);

export default CollapsibleListViewer;
