import React from 'react';
import { VideoSettingsProps } from '../types';
import classNames from 'classnames';
import { mergeStyles } from 'wix-rich-content-common';
import Styles from '../../statics/styles/video-settings.scss';
import {
  LabeledToggle,
  SettingsSection,
  SettingsPanelFooter,
  SettingsMobileHeader,
} from 'wix-rich-content-ui-components';

const VideoSettings: React.FC<VideoSettingsProps> = ({
  componentData,
  theme,
  t,
  isMobile,
  settings,
  onSave,
  onCancel,
  updateData,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const getSpoilerConfig = enabled => ({
    config: { ...componentData.config, spoiler: { enabled } },
  });

  const isCustomVideo = !!componentData.isCustomVideo;

  const spoilerToggle = {
    isChecked: () => componentData.config?.spoiler?.enabled,
    labelKey: 'VideoSettings_Spoiler_Toggle',
    dataHook: 'videoSpoilerToggle',
    tooltipText: 'Spoiler_Toggle_Tooltip',
    onToggle: value => updateData(getSpoilerConfig(value)),
  };
  const downloadToggle = {
    isChecked: () => !componentData.disableDownload,
    labelKey: 'VideoPlugin_Settings_VideoCanBeDownloaded_Label',
    dataHook: 'videoDownloadToggle',
    tooltipText: 'VideoPlugin_Settings_VideoCanBeDownloaded_Tooltip',
    onToggle: value => updateData({ disableDownload: !value }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleData: Record<string, any>[] = isCustomVideo ? [downloadToggle] : [];
  settings.spoiler && toggleData.push(spoilerToggle);

  const headerProps = { theme, t, isMobile, onSave, onCancel, styles };

  return (
    <div
      data-hook="settings"
      className={classNames(styles.videoSettings, {
        [styles.videoSettings_mobile]: isMobile,
      })}
    >
      <Header {...headerProps} />
      <SettingsSection theme={theme} className={classNames(styles.videoSettings_toggleContainer)}>
        {toggleData.map(({ labelKey, tooltipText, dataHook, onToggle, isChecked }) => (
          <LabeledToggle
            key={labelKey}
            theme={theme}
            checked={isChecked()}
            label={t(labelKey)}
            onChange={() => onToggle(!isChecked())}
            tooltipText={t(tooltipText)}
            dataHook={dataHook}
          />
        ))}
      </SettingsSection>
      {!isMobile && (
        <SettingsPanelFooter
          className={styles.videoSettings_footer}
          fixed
          theme={theme}
          cancel={onCancel}
          save={onSave}
          t={t}
        />
      )}
    </div>
  );
};

const Header = ({ theme, t, isMobile, onSave, onCancel, styles }) => {
  const mobileSettingsProps = {
    t,
    theme,
    dataHookPrefix: 'VideoSettingsMobileHeader',
    cancelLabel: t('SettingsPanelFooter_Cancel'),
    saveLabel: t('SettingsPanelFooter_Save'),
    isMediaSettingsModal: true,
    cancel: onCancel,
    save: onSave,
  };

  return isMobile ? (
    <SettingsMobileHeader {...mobileSettingsProps} />
  ) : (
    <>
      <div className={styles.videoSettingsTitle}>{t('VideoPlugin_Settings_Header')}</div>
      <div className={styles.separator} />
    </>
  );
};

export default VideoSettings;
