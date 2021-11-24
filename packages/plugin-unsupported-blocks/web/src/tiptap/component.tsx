import React from 'react';
import { Component as UnsupportedBlocksComponent } from '../unsupported-blocks-component';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Image: React.FC<PluginProps> = ({ context }) => {
  const { theme, t } = context;
  return <UnsupportedBlocksComponent theme={theme} t={t} />;
};
