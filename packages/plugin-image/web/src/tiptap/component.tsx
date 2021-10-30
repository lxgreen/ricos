import React from 'react';
import { ImageViewer } from '..';
import { IMAGE_TYPE, ImagePluginViewerConfig, ImageData } from '../types';
import { PluginProps } from 'wix-rich-content-editor-common';
import { MediaItemErrorMsg, Loader } from 'wix-rich-content-ui-components';

export const Image: React.FC<PluginProps> = ({
  context,
  componentData,
  node,
  updateAttributes,
}) => {
  const { isMobile, theme, t, config } = context;
  const helpers = {};
  const settings: ImagePluginViewerConfig = config[IMAGE_TYPE] || {};
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;
  const isLoading = node.attrs.myLoading;
  const error = node.attrs.error;

  const handleCaptionChange = caption => {
    updateAttributes({ caption });
  };
  const blockKey = node.attrs.id;

  return (
    <>
      <ImageViewer
        theme={theme}
        isMobile={isMobile}
        helpers={helpers}
        componentData={componentData as ImageData}
        isLoading={isLoading}
        dataUrl={isLoading && node.attrs.image.src.url}
        settings={settings}
        defaultCaption={t('ImageViewer_Caption')}
        onCaptionChange={handleCaptionChange}
        setFocusToBlock={blockProps.setFocusToBlock}
        setComponentUrl={setComponentUrl}
        blockKey={blockKey}
      />
      {(isLoading || componentData.loading) && <Loader theme={theme} type={'medium'} />}
      {error && <MediaItemErrorMsg error={error} t={t} />}
    </>
  );
};
