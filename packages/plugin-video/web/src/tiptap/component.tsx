import React from 'react';
import { Component as VideoComponent } from '../video-component';
import { VideoPluginEditorConfig } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Video: React.FC<PluginProps> = ({ context, componentData, updateAttributes }) => {
  const { theme, t } = context;
  const settings: VideoPluginEditorConfig = {};
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;

  return (
    <VideoComponent
      componentData={componentData}
      theme={theme}
      t={t}
      settings={settings}
      blockProps={blockProps}
      setComponentUrl={setComponentUrl}
      onClick={() => {}}
    />
  );
};
