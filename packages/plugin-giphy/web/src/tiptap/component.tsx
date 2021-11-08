import React from 'react';
import { Component as GiphyComponent } from '../giphy-component';
import { GIPHY_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Gif: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme, config = {} } = context;
  const settings = config[GIPHY_TYPE] || {};

  const setComponentUrl = () => null;

  return (
    <GiphyComponent
      componentData={componentData}
      isMobile={isMobile}
      theme={theme}
      settings={settings}
      onClick={() => {}}
      setComponentUrl={setComponentUrl}
    />
  );
};
