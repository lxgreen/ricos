import React from 'react';
import { ActionButtons } from '..';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

import styles from '../../statics/styles/settings-mobile-header.scss';

export interface SettingsMobileHeaderProps {
  onCancel: () => void;
  onSave: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  theme: RichContentTheme;
  title?: string;
  t: TranslationFunction;
}

const SettingsMobileHeader: React.FC<SettingsMobileHeaderProps> = ({
  theme,
  onSave,
  onCancel,
  saveLabel,
  cancelLabel,
  title,
  t,
  children,
}) => {
  const saveText = saveLabel || t('SettingsPanelFooter_Save');
  const cancelText = cancelLabel || t('SettingsPanelFooter_Cancel');

  return (
    <div className={styles.setting_mobile_header}>
      <ActionButtons
        isMobile
        onCancel={onCancel}
        onSave={onSave}
        cancelText={cancelText}
        saveText={saveText}
        theme={theme}
        t={t}
      >
        <>
          {title && <div className={styles.setting_mobile_header_title}>{title}</div>}
          {children}
        </>
      </ActionButtons>
    </div>
  );
};

export default SettingsMobileHeader;
