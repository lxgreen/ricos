import React from 'react';
import styles from '../../statics/styles/audio.scss';
import { ClickOutside } from 'wix-rich-content-editor-common';
import DropdownMenu from './DropdownMenu';
import { ContextMenuIcon } from 'wix-rich-content-ui-components';

const ContextMenu = ({
  onClickOutside,
  contextMenuData,
  playBackMenuData,
  showContextMenu,
  showPlaybackMenu,
  onClick,
}) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      onClick();
    }
  };

  return (
    <>
      <ClickOutside onClickOutside={onClickOutside}>
        {showContextMenu && <DropdownMenu options={contextMenuData} onClose={onClickOutside} />}
        {showPlaybackMenu && <DropdownMenu options={playBackMenuData} onClose={onClickOutside} />}
      </ClickOutside>
      <ContextMenuIcon
        tabIndex={0}
        onKeyPress={onKeyPress}
        className={styles.audio_contextMenuIcon}
        onClick={onClick}
      />
    </>
  );
};

export default ContextMenu;
