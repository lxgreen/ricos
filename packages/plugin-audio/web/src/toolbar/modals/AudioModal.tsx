import React, { useState } from 'react';
import ReactPlayer from 'react-player';
import classNames from 'classnames';
import { Tab, Tabs, SettingsMobileHeader } from 'wix-rich-content-ui-components';
import AudioUploadModal from './AudioUploadModal';
import MediaURLInputModal from './MediaURLInputModal';
import {
  MEDIA_POPOVERS_BUTTONS_NAMES_BI,
  MEDIA_POPOVERS_TABS_NAMES_BI,
} from 'wix-rich-content-common';
import { AUDIO_TYPE } from '../../types';
import styles from '../../../statics/styles/audio-modal.scss';

const AudioModal = props => {
  const {
    componentData = {},
    helpers: { closeModal, onPluginsPopOverTabSwitch, onPluginsPopOverClick },
    t,
    theme,
    isMobile,
    embedType = false,
    pubsub,
    helpers,
  } = props;
  const src = componentData?.audio?.src;

  const audioTabs = { embed: t('MediaModal_Tabs_Embed'), upload: t('MediaModal_Tabs_Upload') };
  const initialUrl = src?.url || '';
  const isEmbedType = embedType || src?.url;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState(isEmbedType ? audioTabs.embed : audioTabs.upload);
  const [url, setUrl] = useState(initialUrl);
  const [submittedInvalidUrl, setSubmittedInvalidUrl] = useState(false);

  const onTabSelected = tab => {
    onPluginsPopOverTabSwitch?.({
      pluginId: AUDIO_TYPE,
      buttonName: MEDIA_POPOVERS_TABS_NAMES_BI[tab.toLowerCase()],
    });
    setActiveTab(tab);
  };

  const onUrlInputDoubleClick = () =>
    setUrl(
      'https://soundcloud.com/kotathefriend/smile?utm_source=clipboard&utm_medium=text&utm_campaign=social_sharing'
    );

  const onConfirm = () => {
    onPluginsPopOverClick?.({
      pluginId: AUDIO_TYPE,
      buttonName: MEDIA_POPOVERS_BUTTONS_NAMES_BI.embed,
    });
    if (url && ReactPlayer.canPlay(url)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { audio, name, coverImage, authorName, ...rest } = componentData;
      const { onConfirm } = props;
      if (onConfirm) {
        onConfirm({ ...rest, audio: { src: { url } } });
      } else {
        pubsub.set('componentData', { ...rest, audio: { src: { url } } });
      }
      closeModal?.();
    } else {
      setSubmittedInvalidUrl(true);
    }
  };

  return (
    <div
      className={classNames(styles.audio_modal_container, {
        [styles.audio_modal_mobile]: isMobile,
      })}
    >
      <div className={styles.audio_modal_content}>
        {isMobile && (
          <SettingsMobileHeader
            theme={theme}
            onSave={onConfirm}
            onCancel={() => closeModal()}
            t={t}
            title={t('AudioPlugin_Settings_Header')}
            useNewSettingsUi
            showSaveBtn={false}
          />
        )}
        <Tabs
          value={activeTab}
          onTabSelected={onTabSelected}
          headersStyle={isMobile && styles.audio_tabs_headers}
          theme={theme}
        >
          <Tab label={audioTabs.upload} value={audioTabs.upload} theme={theme}>
            <div className={classNames(styles.audio_modal_tab, styles.audio_upload_tab)}>
              <AudioUploadModal {...props} />
            </div>
          </Tab>
          <Tab label={audioTabs.embed} value={audioTabs.embed} theme={theme}>
            <div className={styles.audio_modal_tab}>
              <MediaURLInputModal
                {...props}
                onConfirm={onConfirm}
                url={url}
                setUrl={setUrl}
                submittedInvalidUrl={submittedInvalidUrl}
                withMobileHeader={false}
                dataHook="audio-data-hook"
                saveLabel={t('AudioModal_Embed_ButtonText')}
                subTitle={t('AudioModal_Embed_Title')}
                withMobileSaveButton
                onDblClick={onUrlInputDoubleClick}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
};

export default AudioModal;
