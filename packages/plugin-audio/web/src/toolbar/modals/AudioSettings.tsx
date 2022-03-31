import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { getImageSrc } from 'wix-rich-content-common/libs/imageUtils';
import { SETTINGS_IMG_SIZE } from '../../consts';
import {
  LabeledToggle,
  SettingsSection,
  SettingsPanelHeader,
  SettingsMobileHeader,
  SettingsSeparator,
  SettingsAddItem,
  InputWithLabel,
  Label,
} from 'wix-rich-content-ui-components';
import Styles from '../../../statics/styles/audio-settings.scss';

const AudioSettings = ({
  onCancel,
  updateData,
  componentData,
  helpers,
  pubsub,
  theme,
  t,
  isMobile,
  settings,
  experiments,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const downLoadEnabled = !(componentData?.disableDownload ?? settings.disableDownload);
  const [isDownloadEnabled, setIsDownloadEnabled] = useState(downLoadEnabled);
  const [coverImage, setCoverImage] = useState(componentData?.coverImage || null);
  const [name, setName] = useState(componentData?.name || '');
  const [authorName, setAuthorName] = useState(componentData?.authorName || '');
  const useModalBaseActionHoc = experiments?.modalBaseActionHoc?.enabled;

  const onDownlandToggle = () => setIsDownloadEnabled(!isDownloadEnabled);

  const handleFilesAdded = args => {
    const img = args.data[0] || args.data;
    setCoverImage(img);
  };

  const handleFileSelection = () => {
    const deleteBlock = pubsub.get('deleteBlock');
    helpers.handleFileSelection(undefined, false, handleFilesAdded, deleteBlock, componentData);
  };

  const handleFileChange = ([file]) => {
    helpers.handleFileUpload(file, handleFilesAdded);
  };

  const handleClose = () => (useModalBaseActionHoc ? onCancel() : helpers.closeModal());

  const handleCoverImageDelete = () => setCoverImage(null);

  const inputsData = [
    {
      label: t('AudioPlugin_Settings_AudioName_Label'),
      value: name,
      onChange: value => setName(value),
      dataHook: 'audioSettingsAudioNameInput',
      placeholder: t('AudioPlugin_Settings_AudioName_Label_Placeholder'),
    },
    {
      label: t('AudioPlugin_Settings_AuthorName_Label'),
      value: authorName,
      onChange: value => setAuthorName(value),
      dataHook: 'audioSettingsAuthorNameInput',
      placeholder: t('AudioPlugin_Settings_AuthorName_Label_Placeholder'),
    },
  ];

  const renderInputs = () =>
    inputsData.map(props => <InputWithLabel key={props.dataHook} theme={theme} {...props} />);

  const renderHeader = () =>
    isMobile ? (
      <SettingsMobileHeader
        t={t}
        theme={theme}
        title={t('AudioPlugin_Settings_Header')}
        onCancel={handleClose}
        onSave={helpers.closeModal}
        useNewSettingsUi
      />
    ) : (
      <SettingsPanelHeader title={t('AudioPlugin_Settings_Header')} onClose={handleClose} />
    );

  const imgSrc =
    coverImage &&
    getImageSrc(coverImage, helpers?.getImageUrl, {
      requiredWidth: 120,
      requiredHeight: 120,
      requiredQuality: 70,
    });

  useEffect(() => {
    useModalBaseActionHoc
      ? updateData({
          ...componentData,
          name,
          authorName,
          disableDownload: !isDownloadEnabled,
          coverImage,
        })
      : pubsub.update('componentData', {
          ...componentData,
          name,
          authorName,
          disableDownload: !isDownloadEnabled,
          coverImage,
        });
  }, [name, authorName, isDownloadEnabled, coverImage]);

  return (
    <div
      data-hook="audioSettings"
      className={classNames(styles.audio_settings, {
        [styles.audio_settings_mobile]: isMobile,
      })}
    >
      <div className={styles.audio_settings_wrapper}>
        <SettingsSection theme={theme} className={classNames(styles.audio_settings_inputs_wrapper)}>
          {renderInputs()}
        </SettingsSection>

        <SettingsSection theme={theme}>
          <Label label={t('AudioPlugin_Settings_CoverImage_Label')} />
          <div className={styles.audio_settings_coverImage_wrapper}>
            <SettingsAddItem
              handleFileChange={handleFileChange}
              handleFileSelection={helpers.handleFileSelection && handleFileSelection}
              isMobile={isMobile}
              uploadMediaLabel={t('AudioPlugin_Settings_CoverImage_Label')}
              theme={theme}
              dataHook="audioCoverImageInput"
              inlineStyle={{ width: SETTINGS_IMG_SIZE, height: SETTINGS_IMG_SIZE, marginLeft: 0 }}
              src={imgSrc}
              handleDelete={handleCoverImageDelete}
              t={t}
              alt={name}
            />
          </div>
        </SettingsSection>

        <SettingsSeparator top />

        <SettingsSection theme={theme} className={classNames(styles.audio_settings_toggle_wrapper)}>
          <LabeledToggle
            key="disableDownload"
            theme={theme}
            checked={isDownloadEnabled}
            label={t('AudioPlugin_Settings_AudioCanBeDownloaded_Label')}
            onChange={onDownlandToggle}
            tooltipText={t('AudioPlugin_Settings_AudioCanBeDownloaded_Tooltip')}
            dataHook="AudioDownloadToggle"
          />
        </SettingsSection>
        {isMobile && (
          <div className={classNames(styles.audio_settings_download_label)}>
            {t('AudioPlugin_Settings_AudioCanBeDownloaded_Tooltip')}
          </div>
        )}
        {renderHeader()}
      </div>
    </div>
  );
};

export default AudioSettings;
