/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { CSSProperties } from 'react';
import FileInput from './FileInput';
import Image from './Image';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { PlusIcon, ReplaceIcon, DeleteIcon } from '../Icons';
import styles from '../../statics/styles/settings-add-item.scss';
import classNames from 'classnames';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';

interface AddItemOverlayProps {
  handleReplace?: () => void;
  handleDelete?: () => void;
  t: TranslationFunction;
  src: string;
  theme?: RichContentTheme;
  alt?: string;
}

const AddItemOverlay: React.FC<AddItemOverlayProps> = ({
  handleReplace,
  handleDelete,
  src,
  theme,
  alt,
  t,
}) => (
  <div className={styles.settingsAddItem_overlay}>
    <div className={styles.settingsAddItem_overlay_icons}>
      <Tooltip content={t('Settings_Replace_Image_Tooltip')} place="top">
        <ReplaceIcon tabIndex={0} onClick={handleReplace} />
      </Tooltip>
      <Tooltip content={t('Settings_Remove_Image_Tooltip')} place="top">
        <DeleteIcon tabIndex={0} onClick={handleDelete} />
      </Tooltip>
    </div>
    <Image
      className={styles.settingsAddItem_overlay_image}
      src={src}
      resizeMode={'cover'}
      theme={theme || styles}
      alt={alt}
      t={t}
    />
  </div>
);

interface SettingsAddItemProps {
  handleFileChange: (files?: any, itemPos?: any) => void;
  isMobile?: boolean;
  handleFileSelection?: () => void;
  handleDelete?: () => void;
  inlineStyle?: CSSProperties;
  theme?: RichContentTheme;
  t: TranslationFunction;
  src?: string;
  alt?: string;
  uploadMediaLabel: string;
  accept?: string;
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
  handleDelete,
  src,
  alt,
  t,
}) => {
  return (
    <div className={styles.settingsAddItem_container}>
      <FileInput
        className={classNames(styles.settingsAddItem, styles.filesItem, {
          [styles.mobile]: isMobile,
        })}
        dataHook={dataHook}
        onChange={handleFileChange}
        handleFileSelection={handleFileSelection}
        tabIndex={src ? -1 : 0}
        multiple
        theme={theme}
        title={uploadMediaLabel}
        style={inlineStyle}
        accept={accept}
      >
        <PlusIcon />
      </FileInput>
      {src && (
        <AddItemOverlay
          handleDelete={handleDelete}
          handleReplace={handleFileSelection}
          theme={theme}
          src={src}
          alt={alt}
          t={t}
        />
      )}
    </div>
  );
};

export default SettingsAddItem;
