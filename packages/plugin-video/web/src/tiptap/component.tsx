import React from 'react';
import { Component as VideoComponent } from '../video-component';
import { VIDEO_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';

export const Video: React.FC<PluginProps> = ({ context, componentData, updateAttributes }) => {
  const { theme, t, config = {} } = context;
  const settings = config[VIDEO_TYPE] || {};
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;
  const store = {
    update: (type, data) => updateAttributes(convertBlockDataToRicos(VIDEO_TYPE, data)),
  };

  return (
    <VideoComponent
      componentData={componentData}
      theme={theme}
      t={t}
      settings={settings}
      blockProps={blockProps}
      setComponentUrl={setComponentUrl}
      onClick={() => {}}
      store={store}
    />
  );
};
