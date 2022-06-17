import React, { useContext } from 'react';
import { Component as HtmlComponent } from '../HtmlComponent';
import type { PluginProps } from 'ricos-tiptap-types';
import { RicosContext } from 'ricos-context';

export const Html: React.FC<PluginProps> = ({
  settings,
  componentData,
  updateAttributes,
  node,
}) => {
  const { theme, isMobile } = useContext(RicosContext);

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
      iframeSandboxDomain={''}
      store={store}
      settings={settings}
      isMobile={isMobile}
      theme={theme}
    />
  );
};
