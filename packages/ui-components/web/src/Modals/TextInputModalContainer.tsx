/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import classNames from 'classnames';
import {
  mergeStyles,
  TranslationFunction,
  RichContentTheme,
  Helpers,
  TextDirection,
} from 'wix-rich-content-common';
import { SettingsMobileHeader, Button } from '..';
import { BUTTON_SIZE } from '../consts';
import Styles from '../../statics/styles/url-input-modal.scss';

interface TextInputModalContainerProps {
  t: TranslationFunction;
  theme?: RichContentTheme;
  languageDir?: TextDirection;
  dataHook: string;
  children?: React.ReactNode;
  title?: string;
  isMobile?: boolean;
  hasMobileSettings?: boolean;
  selected?: boolean;
  onConfirm: () => void;
  onCloseRequested: (() => void) | undefined;
  submittedInvalidUrl?: any;
  errorMessage: string;
  placeholder: string;
  isInlineModal?: boolean;
  buttonAlignment?: string;
  saveLabel?: string;
  onInputChange: (text) => void;
  input?: string;
  helpers?: Helpers;
}

const TextInputModalContainer: React.FC<TextInputModalContainerProps> = ({
  t,
  theme = {},
  languageDir,
  dataHook,
  children,
  title,
  isMobile,
  hasMobileSettings = true,
  selected = true,
  onConfirm,
  onCloseRequested,
  isInlineModal = true,
  saveLabel,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const saveLabelText = saveLabel || t('EmbedURL_Common_CTA_Primary');

  const renderMobileHeader = () => (
    <SettingsMobileHeader
      theme={theme}
      onSave={onConfirm}
      onCancel={() => onCloseRequested?.()}
      t={t}
      title={t('EmbedURL_MobileHeader')}
    />
  );

  const renderTitle = () => (
    <div className={styles.input_header}>
      <div className={styles.input_header_text}>{title}</div>
    </div>
  );

  const renderDesktopFooter = () => (
    <Button
      dataHook="actionButtonSave"
      disabled={!selected}
      text={saveLabelText}
      onClick={onConfirm}
      size={BUTTON_SIZE.medium}
      theme={theme}
    />
  );

  return (
    <div
      className={classNames(styles.inputModal_container, {
        [styles.inlineModal]: isInlineModal,
      })}
    >
      {isMobile && hasMobileSettings && renderMobileHeader()}
      <div className={styles.inputModal_content} data-hook={dataHook} dir={languageDir}>
        {title && renderTitle()}
        <div className={styles.inputModal_textInput}>{children}</div>
        {!isMobile && renderDesktopFooter()}
      </div>
    </div>
  );
};

export default TextInputModalContainer;
