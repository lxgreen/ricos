import React from 'react';
import type { PluginProps } from 'wix-rich-content-editor-common';
import { DividerComponent } from '..';

export const Divider: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  return <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />;
};
