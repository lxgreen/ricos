import React from 'react';
import { DividerComponent } from '..';
import type { PluginProps } from 'ricos-tiptap-types';

export const Divider: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  return <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />;
};
