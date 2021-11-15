import React from 'react';
import { Component as GalleryComponent } from '../gallery-component';
import { GALLERY_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Gallery: React.FC<PluginProps> = ({ context, componentData, node }) => {
  const { isMobile, theme, t, config = {} } = context;
  const helpers = {};
  const settings = config[GALLERY_TYPE] || {};
  const block = {
    getKey: () => node.attrs.id,
  };
  const isLoading = node.attrs.loading;
  const error = node.attrs.error;
  const anchorTarget = '';
  const relValue = '';

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
      isLoading={isLoading}
      error={error}
    />
  );
};
