import React, { useState } from 'react';
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
  const disableDownload =
    componentData.disableDownload !== undefined
      ? componentData.disableDownload
      : !!settings.disableDownload;
  const isSpoilered = componentData.config?.spoiler?.enabled;

  const styles = mergeStyles({ styles: Styles, theme });

  const isCustomVideo = !!componentData.isCustomVideo;

  const spoilerToggle = {
    labelKey: 'VideoSettings_Spoiler_Toggle',
    dataHook: 'videoSpoilerToggle',
    tooltipText: 'Spoiler_Toggle_Tooltip',
    checked: isSpoilered,
    onToggle: () =>
      updateData({ config: { ...componentData.config, spoiler: { enabled: !isSpoilered } } }),
  };
  const downloadToggle = {
    labelKey: 'VideoPlugin_Settings_VideoCanBeDownloaded_Label',
    dataHook: 'videoDownloadToggle',
    tooltipText: 'VideoPlugin_Settings_VideoCanBeDownloaded_Tooltip',
    checked: !disableDownload,
    onToggle: () => updateData({ disableDownload: !disableDownload }),
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toggleData: Record<string, any>[] = isCustomVideo ? [downloadToggle] : [];
  settings.spoiler && toggleData.push(spoilerToggle);

  return (
    <div
      data-hook="settings"
      className={classNames(styles.videoSettings, {
        [styles.videoSettings_mobile]: isMobile,
      })}
    >
      {isMobile ? (
        <SettingsMobileHeader t={t} theme={theme} onCancel={onCancel} onSave={onSave} />
      ) : (
        <>
          <div className={styles.videoSettingsTitle}>{t('VideoPlugin_Settings_Header')}</div>
          <div className={styles.separator} />
        </>
      )}
      <SettingsSection theme={theme} className={classNames(styles.videoSettings_toggleContainer)}>
        {toggleData.map(({ labelKey, tooltipText, dataHook, onToggle, checked }) => (
          <LabeledToggle
            key={labelKey}
            theme={theme}
            checked={checked}
            label={t(labelKey)}
            onChange={onToggle}
            tooltipText={t(tooltipText)}
            dataHook={dataHook}
          />
        ))}
      </SettingsSection>
      {!isMobile && (
        <SettingsPanelFooter fixed theme={theme} cancel={onCancel} save={onSave} t={t} />
      )}
    </div>
  );
};

export default VideoSettings;
