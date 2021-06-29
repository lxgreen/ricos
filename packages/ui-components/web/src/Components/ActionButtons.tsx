import React from 'react';
import classNames from 'classnames';
import Button from './Button';
import { RichContentTheme } from 'wix-rich-content-common';
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
  saveBtnDataHook?: string;
  cancelBtnDataHook?: string;
  selected?: boolean;
  theme?: RichContentTheme;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  size,
  onCancel,
  onSave,
  cancelText,
  saveText,
  isMobile = false,
  saveBtnDataHook,
  cancelBtnDataHook,
  theme,
  selected = true,
}) => (
  <div className={classNames(styles.action_buttons, { [styles.mobile]: isMobile })}>
    <Button
      size={size}
      theme={theme}
      ariaProps={{ 'aria-label': cancelText }}
      dataHook={cancelBtnDataHook}
      onClick={onCancel}
      className={classNames(styles.action_buttons_button, {
        [styles.mobile]: isMobile,
      })}
      type={'secondary'}
    >
      {cancelText}
    </Button>
    <Button
      size={size}
      ariaProps={{ 'aria-label': saveText } && !selected && { disabled: 'disabled' }}
      theme={theme}
      className={classNames(
        styles.action_buttons_button,
        styles.action_buttons_button_save,
        { [styles.mobile]: isMobile },
        { [styles.disabled]: !selected }
      )}
      dataHook={saveBtnDataHook}
      onClick={onSave}
      type={'primary'}
    >
      {saveText}
    </Button>
  </div>
);

export default ActionButtons;
