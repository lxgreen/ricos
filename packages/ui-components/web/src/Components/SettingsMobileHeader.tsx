import React from 'react';
import { Button } from '..';
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
  const buttonsDataHook = { save: 'actionButtonSave', cancel: 'actionButtonCancel' };

  const renderButton = (text, dataHook, onClick) => (
    <Button ariaLabel={text} theme={theme} isMobile dataHook={dataHook} onClick={onClick}>
      {text}
    </Button>
  );

  return (
    <div className={styles.setting_mobile_header}>
      {renderButton(saveText, buttonsDataHook.save, onSave)}
      <>
        {title && <div className={styles.setting_mobile_header_title}>{title}</div>}
        {children}
      </>
      {renderButton(cancelText, buttonsDataHook.cancel, onCancel)}
    </div>
  );
};

export default SettingsMobileHeader;
