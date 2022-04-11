import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginAudio } from 'wix-rich-content-plugin-audio';

const Editor: FunctionComponent<{
  content?: DraftContent;
  handleFileUpload?: (files, updateEntity) => void;
}> = ({ content, handleFileUpload }) => (
  <RicosEditor plugins={[pluginAudio({ handleFileUpload })]} content={content} />
);

export default Editor;
