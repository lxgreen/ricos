import React from 'react';
import { NewUrlInputModal, BUTTON_SIZE } from 'wix-rich-content-ui-components';
import { Helpers, TranslationFunction, TextDirection } from 'wix-rich-content-common';

interface MediaURLInputModalProps {
  onConfirm: () => void;
  helpers: Helpers;
  t: TranslationFunction;
  isMobile?: boolean;
  languageDir?: TextDirection;
  url: string;
  submittedInvalidUrl: boolean;
  setUrl: (url) => void;
  isYouTube: boolean;
  isSoundCloud: boolean;
  withMobileHeader?: boolean;
}

const MediaURLInputModal: React.FC<MediaURLInputModalProps> = ({
  t,
  languageDir,
  helpers,
  isMobile,
  url,
  submittedInvalidUrl,
  setUrl,
  isYouTube,
  isSoundCloud,
  withMobileHeader = false,
  onConfirm,
}) => {
  const dataHook = isYouTube
    ? 'socialEmbedUploadModal'
    : isSoundCloud
    ? 'soundCloudUploadModal'
    : 'videoMediaUrlModal';
  const title = isYouTube
    ? t('EmbedURL_Social_YouTube_Title')
    : isSoundCloud
    ? isMobile
      ? t('SoundCloudUploadModal_Header_Mobile')
      : t('SoundCloudUploadModal_Header')
    : t('VideoModal_Embed_Title');

  return (
    <NewUrlInputModal
      onConfirm={onConfirm}
      helpers={helpers}
      input={url}
      t={t}
      languageDir={languageDir}
      title={t(`${title}`)}
      submittedInvalidUrl={submittedInvalidUrl}
      dataHook={dataHook}
      saveLabel={t('VideoModal_Embed_ButtonText')}
      onInputChange={url => setUrl(url)}
      errorMessage={t('SoundCloudUploadModal_Input_InvalidUrl')}
      placeholder={t('EmbedURL_Placeholder')}
      onCloseRequested={helpers.closeModal}
      buttonSize={BUTTON_SIZE.medium}
      isMobile={isMobile}
      withMobileHeader={withMobileHeader}
    />
  );
};

export default MediaURLInputModal;
