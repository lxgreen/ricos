/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import type { ToolbarItemProps } from '../../../types';
import styles from './ToggleButton.scss';

export const ToggleButton = ({ toolbarItem }: ToolbarItemProps) => {
  const Icon = toolbarItem.presentation?.icon;
  return (
    <div
      className={cx(styles.toggleButtonWrapper, toolbarItem.attributes.active ? styles.active : '')}
    >
      <div
        className={styles.toggleButton}
        role="button"
        onClick={e => toolbarItem.commands?.click(e)}
        tabIndex={0}
      >
        <Icon />
      </div>
    </div>
  );
};
