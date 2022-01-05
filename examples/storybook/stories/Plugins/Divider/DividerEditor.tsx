import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginDivider } from 'wix-rich-content-plugin-divider';

const DividerEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginDivider()]} content={content} />
);

export default DividerEditor;
