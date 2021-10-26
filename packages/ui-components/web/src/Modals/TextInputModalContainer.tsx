/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
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
  subTitle?: string;
  isMobile?: boolean;
  withMobileHeader?: boolean;
  selected?: boolean;
  showTitle?: boolean;
  onConfirm: () => void;
  onCloseRequested: (() => void) | undefined;
  submittedInvalidUrl?: any;
  errorMessage: string;
  placeholder: string;
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
  subTitle,
  isMobile,
  withMobileHeader = true,
  selected = true,
  showTitle = true,
  onConfirm,
  onCloseRequested,
  saveLabel,
}) => {
  const styles = mergeStyles({ styles: Styles, theme });
  const saveLabelText = saveLabel || t('EmbedURL_Common_CTA_Primary');
  const modalTitle = title && showTitle && <div className={styles.input_header_title}>{title}</div>;
  const modalSubTitle = subTitle && <div className={styles.input_header_subTitle}>{subTitle}</div>;

  const renderMobileHeader = () => (
    <SettingsMobileHeader
      theme={theme}
      onSave={onConfirm}
      onCancel={() => onCloseRequested?.()}
      t={t}
      title={t('EmbedURL_MobileHeader')}
    />
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
    <div className={styles.inputModal_container}>
      {isMobile && withMobileHeader && renderMobileHeader()}
      <div className={styles.inputModal_content} data-hook={dataHook} dir={languageDir}>
        {modalTitle}
        {modalSubTitle}
        <div className={styles.inputModal_textInput}>{children}</div>
        {!isMobile && renderDesktopFooter()}
      </div>
    </div>
  );
};

export default TextInputModalContainer;
