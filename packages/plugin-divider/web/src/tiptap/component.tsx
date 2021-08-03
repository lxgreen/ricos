import React from 'react';
import { DividerComponent } from '..';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Divider: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  return (
    <div>
      <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />
    </div>
  );
};
