import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import { Tab, Tabs, SettingsMobileHeader } from 'wix-rich-content-ui-components';
import VideoUploadModal from './videoUploadModal';
import NewMediaURLInputModal from './NewMediaUrlInputModal';
import { videoButtonsTypes } from '../types';
import styles from '../../statics/styles/video-modal.scss';

const VideoModal = props => {
  const {
    componentData: { isCustomVideo, src },
  } = props;
  const videoTabs = { embed: 'Embed', upload: 'Upload' };
  const initialUrl = isCustomVideo ? '' : src || '';
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState(isCustomVideo ? videoTabs.upload : videoTabs.embed);
  const [url, setUrl] = useState(initialUrl);
  const [submittedInvalidUrl, setSubmittedInvalidUrl] = useState(false);
  const {
    theme,
    isMobile,
    t,
    componentData: { type },
    helpers: { closeModal },
  } = props;

  const isYoutubeType = type === videoButtonsTypes.youTube;
  const isSoundCloud = type === videoButtonsTypes.soundCloud;
  const isEmbedType = isYoutubeType || isSoundCloud;

  const onConfirm = () => {
    if (url && ReactPlayer.canPlay(url)) {
      const { componentData, helpers, pubsub, onConfirm } = props;
      if (onConfirm) {
        onConfirm({ ...componentData, src: url });
      } else {
        pubsub.update('componentData', { src: url });
      }

      if (helpers && helpers.onVideoSelected) {
        helpers.onVideoSelected(url, data =>
          pubsub.update('componentData', { metadata: { ...data } })
        );
      }

      closeModal?.();
    } else {
      setSubmittedInvalidUrl(true);
    }
  };
  const dataHook = isYoutubeType
    ? 'socialEmbedUploadModal'
    : isSoundCloud
    ? 'soundCloudUploadModal'
    : 'videoMediaUrlModal';

  const title = isYoutubeType
    ? t('EmbedURL_Social_YouTube_Title')
    : isSoundCloud
    ? isMobile
      ? t('SoundCloudUploadModal_Header_Mobile')
      : t('SoundCloudUploadModal_Header')
    : null;

  const renderMediaUrlInputModal = () => {
    return (
      <NewMediaURLInputModal
        {...props}
        onConfirm={onConfirm}
        url={url}
        setUrl={setUrl}
        submittedInvalidUrl={submittedInvalidUrl}
        withMobileHeader={isEmbedType}
        dataHook={dataHook}
        title={isEmbedType && title}
        subTitle={!isEmbedType && t('VideoModal_Embed_Title')}
      />
    );
  };

  return isEmbedType ? (
    renderMediaUrlInputModal()
  ) : (
    <div className={styles.video_modal_container}>
      <div className={styles.video_modal_content}>
        {isMobile && (
          <SettingsMobileHeader
            theme={theme}
            onSave={onConfirm}
            onCancel={() => closeModal()}
            t={t}
            title={t('VideoModal_MobileHeader')}
          />
        )}
        <Tabs value={activeTab} className={styles.video_modal_tabs_header} theme={theme}>
          <Tab label={videoTabs.embed} value={videoTabs.embed} theme={theme}>
            <div className={styles.video_modal_tab}>{renderMediaUrlInputModal()}</div>
          </Tab>
          <Tab label={videoTabs.upload} value={videoTabs.upload} theme={theme}>
            <div className={classNames(styles.video_modal_tab, styles.video_upload_tab)}>
              <VideoUploadModal {...props} />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default VideoModal;
