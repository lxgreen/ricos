//@ts-nocheck
import React from 'react';
import { ImageComponent } from '..';
import { IMAGE_TYPE } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Image: React.FC<PluginProps> = ({
  context,
  componentData,
  updateAttributes,
  node,
}) => {
  const { isMobile, theme, t, config = {} } = context;
  const store = {
    update: (propery, data) => {
      // update caption
      updateAttributes({ caption: data.config.caption });
    },
    setBlockHandler: () => null,
  };
  const helpers = {};
  const componentState = {};
  const settings = config[IMAGE_TYPE] || {};
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;
  const block = {
    getKey: () => node.attrs.id,
  };

  return (
    <ImageComponent
      componentData={componentData}
      isMobile={isMobile}
      theme={theme}
      store={store}
      helpers={helpers}
      componentState={componentState}
      t={t}
      settings={settings}
      blockProps={blockProps}
      setComponentUrl={setComponentUrl}
      block={block}
    />
  );
};
