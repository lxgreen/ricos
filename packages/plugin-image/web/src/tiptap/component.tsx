import React from 'react';
import { ImageComponent } from '..';
import { ImagePluginEditorConfig } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';

export const Image: React.FC<PluginProps> = ({ context, componentData, updateAttributes }) => {
  const { isMobile, theme, t } = context;
  const store = {
    update: (propery, data) => {
      // update caption
      updateAttributes({ caption: data.config.caption });
    },
    setBlockHandler: () => null,
  };
  const helpers = {};
  const componentState = {};
  const settings: ImagePluginEditorConfig = {};
  const disableRightClick = settings?.uiSettings?.disableRightClick;
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;
  const block = {
    getKey: () => {
      return '';
    },
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
      disableRightClick={disableRightClick}
      blockProps={blockProps}
      setComponentUrl={setComponentUrl}
      block={block}
    />
  );
};
