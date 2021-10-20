import React from 'react';
import { Component as GalleryComponent } from '../gallery-component';
import { GALLERY_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Gallery: React.FC<PluginProps> = ({ context, componentData, node }) => {
  const { isMobile, theme, t, anchorTarget, relValue, config } = context;
  const helpers = {};
  const settings = config[GALLERY_TYPE];
  const block = {
    getKey: () => node.attrs.id,
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
