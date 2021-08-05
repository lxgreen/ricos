import React from 'react';
import { DividerComponent } from '..';
import { TiptapPluginProps } from 'wix-rich-content-common';

export const Divider: React.FC<TiptapPluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  return (
    <div>
      <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />
    </div>
  );
};
