import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginMap } from 'wix-rich-content-plugin-map';

const MapEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginMap()]} content={content} />
);

export default MapEditor;
