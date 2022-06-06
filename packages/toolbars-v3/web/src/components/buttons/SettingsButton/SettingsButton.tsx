/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useRef } from 'react';
import cx from 'classnames';
import type { IToolbarItem } from '../../../types';
import styles from './SettingsButton.scss';
import { ToolbarContext } from '../../../utils/toolbarContexts';
import { ModalContext } from 'ricos-modals';

const SettingsButton = ({ toolbarItem }: { toolbarItem: IToolbarItem }) => {
  const { modalService } = useContext(ModalContext) || {};
  const { isMobile } = useContext(ToolbarContext) || {};
  const buttonRef = useRef<HTMLDivElement>(null);

  const Icon = toolbarItem.presentation?.icon;
  const node = toolbarItem.attributes.selectedNode;

  return (
    <div
      className={cx(styles.settingsButtonWrapper, {
        [styles.mobileSettingsButtonWrapper]: isMobile,
        [styles.active]: toolbarItem.attributes.active,
        [styles.disabled]: toolbarItem.attributes.disabled,
      })}
      ref={buttonRef}
    >
      <div
        onMouseDown={e => e.preventDefault()}
        className={cx(styles.settingsButton, { [styles.mobileSettingsButton]: isMobile })}
        role="button"
        onClick={() => toolbarItem.commands.click({ modalService, isMobile, node })}
        tabIndex={0}
      >
        <Icon />
      </div>
    </div>
  );
};

export default SettingsButton;
