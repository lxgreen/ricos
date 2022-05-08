import React, { useContext } from 'react';
import { DividerComponent } from '..';
import type { PluginProps } from 'ricos-tiptap-types';
import { RicosContext } from 'wix-rich-content-editor-common';

export const Divider: React.FC<PluginProps> = ({ componentData }) => {
  const { theme, t, isMobile } = useContext(RicosContext);
  return <DividerComponent componentData={componentData} isMobile={isMobile} theme={theme} />;
};
