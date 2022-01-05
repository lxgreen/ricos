import type { FunctionComponent } from 'react';
import React from 'react';
import type { DraftContent } from 'ricos-editor';
import { RicosEditor } from 'ricos-editor';
import { pluginFileUpload } from 'wix-rich-content-plugin-file-upload';

const FileUploadEditor: FunctionComponent<{
  content?: DraftContent;
  onFilesChange: (files, updateEntity) => void;
}> = ({ content, onFilesChange }) => {
  const config = {
    onFileSelected: onFilesChange,
  };
  return <RicosEditor plugins={[pluginFileUpload(config)]} content={content} />;
};

export default FileUploadEditor;
