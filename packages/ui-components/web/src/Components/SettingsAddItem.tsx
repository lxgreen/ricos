/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CSSProperties } from 'react';
import React from 'react';
import FileInput from './FileInput';
import PlusIcon from '../Icons/PlusIcon';
import styles from '../../statics/styles/settings-add-item.scss';
import classNames from 'classnames';
import type { RichContentTheme } from 'wix-rich-content-common';

interface SettingsAddItemProps {
  handleFileChange: (files?: any, itemPos?: any) => void;
  isMobile?: boolean;
  handleFileSelection?: () => void;
  inlineStyle?: CSSProperties;
  theme?: RichContentTheme;
  uploadMediaLabel: string;
  accept: string;
  dataHook: string;
}

const SettingsAddItem: React.FC<SettingsAddItemProps> = ({
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
      className={classNames(styles.settingsAddItem, styles.filesItem, {
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

export default SettingsAddItem;
