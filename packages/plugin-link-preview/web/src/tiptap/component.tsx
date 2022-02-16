import React from 'react';
import LinkPreviewComponent from '../LinkPreviewComponent';
import type { LinkPreviewPluginEditorConfig } from '../types';
import type { PluginProps } from 'ricos-tiptap-types';
import { LINK_PREVIEW_TYPE } from 'ricos-content';

export const LinkPreview: React.FC<PluginProps> = ({ context, componentData }) => {
  const { isMobile, theme, iframeSandboxDomain, config = {} } = context;
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
