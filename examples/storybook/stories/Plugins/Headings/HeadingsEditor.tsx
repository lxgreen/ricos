import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginHeadings } from 'wix-rich-content-plugin-headings';

const HeadingsEditor: FunctionComponent<{
  content?: DraftContent;
  withHeadingsMenu?: boolean;
}> = ({ content, withHeadingsMenu }) => (
  <RicosEditor plugins={withHeadingsMenu ? [pluginHeadings()] : []} content={content} />
);

export default HeadingsEditor;
