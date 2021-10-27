import React from 'react';
import LinkPreviewComponent from '../LinkPreviewComponent';
import { LinkPreviewPluginEditorConfig } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';
import { LINK_PREVIEW_TYPE } from 'ricos-content';

export const LinkPreview: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme, iframeSandboxDomain, config } = context;
  const settings: LinkPreviewPluginEditorConfig = config[LINK_PREVIEW_TYPE] || {};
  const blockProps = {
    setFocusToBlock: () => null,
    getData: () => componentData,
  };

  return (
    <LinkPreviewComponent
      isMobile={isMobile}
      theme={theme}
      settings={settings}
      blockProps={blockProps}
      iframeSandboxDomain={iframeSandboxDomain}
    />
  );
};
