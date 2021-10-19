import React from 'react';
import { Component as GalleryComponent } from '../gallery-component';
import { GalleryPluginEditorConfig } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Gallery: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme, t, anchorTarget, relValue } = context;
  const helpers = {};
  const settings: GalleryPluginEditorConfig = {};
  const block = {
    getKey: () => {
      return '';
    },
  };

  return (
    <GalleryComponent
      componentData={componentData}
      isMobile={isMobile}
      theme={theme}
      helpers={helpers}
      t={t}
      settings={settings}
      block={block}
      anchorTarget={anchorTarget}
      relValue={relValue}
    />
  );
};
