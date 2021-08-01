import React from 'react';
import { DividerComponent } from '.';
import { DividerData } from 'ricos-schema';
import { createNodeExtension, PluginProps } from 'wix-rich-content-editor-common';

const Divider: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  return (
    <div>
      <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />
    </div>
  );
};

const componentDataDefaults = DividerData.fromJSON({});
export const tiptapExtension = createNodeExtension({
  Component: Divider,
  componentDataDefaults,
  extensionConfig: () => ({
    name: 'divider',
  }),
});
