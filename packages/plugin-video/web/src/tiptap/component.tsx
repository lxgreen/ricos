import React from 'react';
import { Component as VideoComponent } from '../video-component';
import { VideoPluginEditorConfig } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Video: React.FC<PluginProps> = ({ context, componentData, updateAttributes }) => {
  const { isMobile, theme, t } = context;
  const store = {
    update: (propery, data) => {
      // update caption
      updateAttributes({ caption: data.config.caption });
    },
    setBlockHandler: () => null,
  };
  const componentState = {};
  const settings: VideoPluginEditorConfig = {};
  const disableRightClick = settings?.uiSettings?.disableRightClick;
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;

  return (
    <VideoComponent
      componentData={componentData}
      isMobile={isMobile}
      theme={theme}
      store={store}
      componentState={componentState}
      t={t}
      settings={settings}
      disableRightClick={disableRightClick}
      blockProps={blockProps}
      setComponentUrl={setComponentUrl}
      onClick={() => {}}
    />
  );
};
