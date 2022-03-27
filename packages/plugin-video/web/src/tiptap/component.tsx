import React from 'react';
import { Component as VideoComponent } from '../video-component';
import { VIDEO_TYPE } from '../types';
import type { PluginProps } from 'ricos-tiptap-types';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';

export const Video: React.FC<PluginProps> = ({
  context,
  componentData,
  updateAttributes,
  node,
}) => {
  const { theme, t, config = {} } = context;
  const settings = config[VIDEO_TYPE] || {};
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;
  const store = {
    update: (type, data) => updateAttributes(convertBlockDataToRicos(VIDEO_TYPE, data)),
  };

  const { loading, loadingPercentage } = node.attrs;

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
      isDraggable={false}
      isLoading={loading}
      loadingPercentage={loadingPercentage}
    />
  );
};
