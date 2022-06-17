import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginVideo } from 'wix-rich-content-plugin-video';

const Editor: FunctionComponent<{
  content?: DraftContent;
  handleFileUpload?: (files, updateEntity) => void;
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginVideo({ handleFileUpload })]} content={content} />
);

export default Editor;
