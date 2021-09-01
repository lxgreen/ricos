import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import styles from '../../statics/styles/action-buttons.scss';
import { BUTTON_SIZE } from '../consts';

type ButtonSizeKeys = keyof typeof BUTTON_SIZE;

export interface ActionButtonsProps {
  size?: typeof BUTTON_SIZE[ButtonSizeKeys];
  onCancel: () => void;
  onSave: () => void;
  cancelText: string;
  saveText: string;
  isMobile?: boolean;
  disableSave?: boolean;
  theme: RichContentTheme;
  t: TranslationFunction;
  children?: React.ReactNode;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  size,
  onCancel,
  onSave,
  cancelText,
  saveText,
  isMobile = false,
  theme,
  disableSave = false,
  children,
  t,
}) => (
  <div className={classNames(styles.action_buttons, { [styles.mobile]: isMobile })}>
    <Button
      size={size}
      theme={theme}
      ariaLabel={cancelText}
      dataHook="actionButtonCancel"
      onClick={onCancel}
      className={classNames(styles.action_buttons_button, {
        [styles.mobile]: isMobile,
      })}
      secondary
      text={cancelText || t('SettingsPanelFooter_Cancel')}
    />
    {children}
    <Button
      size={size}
      ariaLabel={saveText}
      disabled={disableSave}
      theme={theme}
      className={classNames(
        styles.action_buttons_button,
        styles.action_buttons_button_primary,
        { [styles.mobile]: isMobile },
        { [styles.disabled]: disableSave }
      )}
      dataHook="actionButtonSave"
      onClick={onSave}
      text={saveText || t('SettingsPanelFooter_Save')}
    />
  </div>
);

export default ActionButtons;
