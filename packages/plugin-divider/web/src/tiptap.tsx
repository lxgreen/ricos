import React from 'react';
import { DividerComponent } from '.';
import { createNodeExtension, PluginProps } from 'wix-rich-content-editor-common';

const Divider: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme } = context;
  return (
    <div>
      <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />
    </div>
  );
};

export const tiptapExtension = createNodeExtension({
  Component: Divider,
  createComponentDataDefaults: ({ DividerData }) => DividerData.fromJSON({}),
  createConfig: () => ({
    name: 'divider',
  }),
});
