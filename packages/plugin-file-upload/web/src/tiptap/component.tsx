import React, { useContext } from 'react';
import { Component as FileUploadComponent } from '../file-upload-component';
import type { PluginProps } from 'ricos-tiptap-types';
import { RicosContext } from 'ricos-context';

export const File: React.FC<PluginProps> = ({ settings, componentData, node }) => {
  const { theme, t, isMobile } = useContext(RicosContext);
  const setComponentUrl = () => null;
  const isLoading = node.attrs.loading;
  const error = node.attrs.error;
  if (error) {
    componentData.error = error;
  }

  return (
    <FileUploadComponent
      componentData={componentData}
      isMobile={isMobile}
      theme={theme}
      setComponentUrl={setComponentUrl}
      t={t}
      settings={settings}
      isLoading={isLoading}
    />
  );
};
