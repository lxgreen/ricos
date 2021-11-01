import React from 'react';
import { Component as VideoComponent } from '../video-component';
import { VIDEO_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Video: React.FC<PluginProps> = ({ context, componentData }) => {
  const { theme, t, config = {} } = context;
  const settings = config[VIDEO_TYPE] || {};
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
