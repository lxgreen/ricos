import React from 'react';
import { Component as GalleryComponent } from '../gallery-component';
import { GalleryPluginEditorConfig } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Gallery: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme, t } = context;
  const helpers = {};
  const settings: GalleryPluginEditorConfig = {};
  const disableRightClick = settings?.uiSettings?.disableRightClick;
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
      disableRightClick={disableRightClick}
      block={block}
      onClick={() => {}}
      className=""
      anchorTarget={context.anchorTarget}
      relValue={context.relValue}
    />
  );
};
