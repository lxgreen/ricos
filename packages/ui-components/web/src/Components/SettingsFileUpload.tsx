import React, { CSSProperties } from 'react';
import FileInput from './FileInput';
import PlusIcon from '../Icons/PlusIcon';
import styles from '../../statics/styles/settings-file-upload.scss';
import classNames from 'classnames';
import { RichContentTheme } from 'wix-rich-content-common';

interface SettingsFileUploadProps {
  handleFileChange: () => void;
  isMobile?: boolean;
  handleFileSelection?: () => void;
  inlineStyle?: CSSProperties;
  theme?: RichContentTheme;
  uploadMediaLabel: string;
  accept: string;
  dataHook: string;
}

const SettingsFileUpload: React.FC<SettingsFileUploadProps> = ({
  handleFileChange,
  isMobile,
  handleFileSelection,
  inlineStyle,
  theme,
  uploadMediaLabel,
  accept,
  dataHook,
}) => {
  return (
    <FileInput
      className={classNames(styles.settingsFileUpload, styles.filesItem, {
        [styles.mobile]: isMobile,
      })}
      dataHook={dataHook}
      onChange={handleFileChange}
      handleFileSelection={handleFileSelection}
      multiple
      theme={theme}
      title={uploadMediaLabel}
      style={inlineStyle}
      accept={accept}
    >
      <PlusIcon />
    </FileInput>
  );
};

export default SettingsFileUpload;
