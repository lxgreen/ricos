import React from 'react';
import { Component as FileUploadComponent } from '../file-upload-component';
import { FILE_UPLOAD_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const File: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme, t, config = {} } = context;
  const settings = config[FILE_UPLOAD_TYPE] || {};
  const setComponentUrl = () => null;

  return (
    <FileUploadComponent
      componentData={componentData}
      isMobile={isMobile}
      theme={theme}
      setComponentUrl={setComponentUrl}
      t={t}
      settings={settings}
    />
  );
};
