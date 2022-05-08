import React, { useContext } from 'react';
import LinkPreviewComponent from '../LinkPreviewComponent';
import type { LinkPreviewPluginEditorConfig } from '../types';
import type { PluginProps } from 'ricos-tiptap-types';
import { RicosContext } from 'wix-rich-content-editor-common';

export const LinkPreview: React.FC<PluginProps> = ({ settings, componentData }) => {
  const { theme, isMobile } = useContext(RicosContext);
  const blockProps = {
    setFocusToBlock: () => null,
    getData: () => componentData,
  };

  return (
    <LinkPreviewComponent
      isMobile={isMobile}
      theme={theme}
      settings={settings as LinkPreviewPluginEditorConfig}
      blockProps={blockProps}
      iframeSandboxDomain={''}
    />
  );
};
