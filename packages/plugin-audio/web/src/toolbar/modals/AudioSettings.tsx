import React from 'react';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import { getImageSrc } from 'wix-rich-content-common/libs/imageUtils';
import { SETTINGS_IMG_SIZE } from '../../consts';
import { debounce } from 'lodash';
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
}) => {
  const { coverImage, authorName, name, disableDownload } = componentData;
  const styles = mergeStyles({ styles: Styles, theme });
  const labeledToggleState = !(disableDownload ?? !!settings.disableDownload);
  const onDownlandToggle = () => updateData({ disableDownload: !disableDownload });

  const handleFilesAdded = args => {
    const coverImage = args.data[0] || args.data;
    updateData({ coverImage });
  };

  const handleFileSelection = () => {
    const deleteBlock = pubsub.get('deleteBlock');
    helpers.handleFileSelection(undefined, false, handleFilesAdded, deleteBlock, componentData);
  };

  const handleFileChange = file => {
    helpers.handleFileUpload(file, handleFilesAdded);
  };

  const handleCoverImageDelete = () => updateData({ coverImage: null });

  const handleChange = debounce((filed, value) => {
    updateData({ [filed]: value });
  }, 40);

  const inputsData = [
    {
      label: t('AudioPlugin_Settings_AudioName_Label'),
      value: name,
      onChange: value => handleChange('name', value),
      dataHook: 'audioSettingsAudioNameInput',
    },
    {
      label: t('AudioPlugin_Settings_AuthorName_Label'),
      value: authorName,
      onChange: value => handleChange('authorName', value),
      dataHook: 'audioSettingsAuthorNameInput',
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
        onCancel={onCancel}
        onSave={helpers?.closeModal}
        useNewSettingsUi
      />
    ) : (
      <SettingsPanelHeader title={t('AudioPlugin_Settings_Header')} onClose={onCancel} />
    );

  const imgSrc =
    coverImage &&
    getImageSrc(coverImage, helpers?.getImageUrl, {
      requiredWidth: 120,
      requiredHeight: 120,
      requiredQuality: 70,
    });

  return (
    <div
      data-hook="audioSettings"
      className={classNames(styles.audio_settings, {
        [styles.audio_settings_mobile]: isMobile,
      })}
    >
      {renderHeader()}
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
            checked={labeledToggleState}
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
      </div>
    </div>
  );
};

export default AudioSettings;
