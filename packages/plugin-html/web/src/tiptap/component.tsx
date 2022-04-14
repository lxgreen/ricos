import React from 'react';
import { Component as HtmlComponent } from '../HtmlComponent';
import { HTML_TYPE } from '../types';
import type { PluginProps } from 'ricos-tiptap-types';

export const Html: React.FC<PluginProps> = ({ context, componentData, updateAttributes, node }) => {
  const { isMobile, theme, config = {}, iframeSandboxDomain } = context;
  const settings = config[HTML_TYPE] || {};
  const updateHtmlHeight = data => {
    updateAttributes({
      containerData: { ...node.attrs.containerData, height: { custom: data.config.height } },
    });
  };
  const store = {
    update: (type, data) => updateHtmlHeight(data),
  };

  return (
    <HtmlComponent
      componentData={componentData}
      iframeSandboxDomain={iframeSandboxDomain}
      store={store}
      settings={settings}
      isMobile={isMobile}
      theme={theme}
    />
  );
};
