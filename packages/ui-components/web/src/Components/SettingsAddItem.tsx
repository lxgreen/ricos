/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import type { CSSProperties } from 'react';
import FileInput from './FileInput';
import Image from './Image';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { LoaderIcon, PlusIcon, ReplaceIcon, TrashIcon } from '../Icons';
import styles from '../../statics/styles/settings-add-item.scss';
import classNames from 'classnames';
import type { RichContentTheme, TranslationFunction } from 'wix-rich-content-common';
import Loader from './Loader';

interface AddItemOverlayProps {
  handleReplace?: () => void;
  handleDelete?: () => void;
  t: TranslationFunction;
  src?: string;
  theme?: RichContentTheme;
  alt?: string;
  isLoading?: boolean;
}

const AddItemOverlay: React.FC<AddItemOverlayProps> = ({
  handleReplace,
  handleDelete,
  src,
  theme,
  alt,
  t,
  isLoading,
}) => {
  return (
    <div
      className={classNames(styles.settingsAddItem_overlay, {
        [styles.withImage]: src,
        [styles.overlay_loading]: isLoading,
      })}
      data-hook="addItemOverlay"
    >
      {src && (
        <>
          <div className={styles.settingsAddItem_overlay_icons}>
            {handleReplace && (
              <Tooltip content={t('Settings_Replace_Image_Tooltip')} place="top">
                <ReplaceIcon tabIndex={0} onClick={handleReplace} />
              </Tooltip>
            )}
            <Tooltip content={t('Settings_Remove_Image_Tooltip')} place="top">
              <TrashIcon
                tabIndex={0}
                onClick={handleDelete}
                data-hook={'addItemOverlay-deleteIcon'}
              />
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
        </>
      )}
      {isLoading && <LoaderIcon className={styles.loader_icon} />}
    </div>
  );
};

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
  isLoading?: boolean;
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
  isLoading,
}) => {
  const hasOverlay = handleDelete;
  return (
    <div className={styles.settingsAddItem_container} data-hook="settingsAddItem_container">
      <FileInput
        className={classNames(styles.settingsAddItem, styles.filesItem, {
          [styles.mobile]: isMobile,
          [styles.withOverlay]: hasOverlay,
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
      {hasOverlay && (
        <AddItemOverlay
          handleDelete={handleDelete}
          theme={theme}
          src={src}
          alt={alt}
          t={t}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default SettingsAddItem;
