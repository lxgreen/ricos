import React from 'react';
import { Component as AudioComponent } from '../audio-component';
import { AUDIO_TYPE } from '../types';
import type { PluginProps } from 'ricos-tiptap-types';

export const Audio: React.FC<PluginProps> = ({ context, componentData, node }) => {
  const { theme, config = {}, isMobile } = context;
  const settings = config[AUDIO_TYPE] || {};
  const helpers = {};
  const { loading } = node.attrs;

  return (
    <AudioComponent
      componentData={componentData}
      theme={theme}
      settings={settings}
      isLoading={loading}
      helpers={helpers}
      isMobile={isMobile}
    />
  );
};
