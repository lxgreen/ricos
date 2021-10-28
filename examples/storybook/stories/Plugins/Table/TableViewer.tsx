import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginImage } from 'wix-rich-content-plugin-image/viewer';
import { pluginTable } from 'wix-rich-content-plugin-table/viewer';
import { pluginLineSpacing } from 'wix-rich-content-plugin-line-spacing/viewer';
import { pluginTextColor, pluginTextHighlight } from 'wix-rich-content-plugin-text-color/viewer';

const plugins = [
  pluginTable(),
  pluginImage(),
  pluginTextColor(),
  pluginTextHighlight(),
  pluginLineSpacing(),
];

const TableViewer: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosViewer content={content} plugins={plugins} />
);

export default TableViewer;
