import React from 'react';
import { ImageViewer } from '..';
import type { ImageData } from '../types';
import { IMAGE_TYPE } from '../types';
import type { PluginProps } from 'ricos-tiptap-types';
import { MediaItemErrorMsg, Loader } from 'wix-rich-content-ui-components';

export const Image: React.FC<PluginProps> = ({
  context,
  componentData,
  updateAttributes,
  node,
}) => {
  const { isMobile, theme, t, config = {} } = context;
  const helpers = {};
  const settings = config[IMAGE_TYPE] || {};
  const blockProps = {
    setFocusToBlock: () => null,
  };
  const setComponentUrl = () => null;
  const { loading, loadingPercentage, error } = node.attrs;

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
        isLoading={loading}
        dataUrl={loading && node.attrs.image?.src?.url}
        settings={settings}
        defaultCaption={t('ImageViewer_Caption')}
        onCaptionChange={handleCaptionChange}
        setFocusToBlock={blockProps.setFocusToBlock}
        setComponentUrl={setComponentUrl}
        blockKey={blockKey}
      />
      {loading && <Loader theme={theme} type={'medium'} percent={loadingPercentage} />}
      {error && <MediaItemErrorMsg error={error} t={t} />}
    </>
  );
};
