import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginSpoiler } from 'wix-rich-content-plugin-spoiler';

const SpoilerEditor: FunctionComponent<{ content?: DraftContent }> = ({ content }) => (
  <RicosEditor plugins={[pluginSpoiler()]} content={content} />
);

export default SpoilerEditor;
