/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import type { ToolbarItemProps } from '../../../types';
import styles from './ToggleButton.scss';

export const ToggleButton = ({ toolbarItem, onClick }: ToolbarItemProps) => {
  const Icon = toolbarItem.presentation?.icon;
  return (
    <div
      className={cx(styles.toggleButtonWrapper, {
        [styles.active]: toolbarItem.attributes.active,
        [styles.disabled]: toolbarItem.attributes.disabled,
      })}
    >
      <div
        onMouseDown={e => e.preventDefault()}
        className={styles.toggleButton}
        role="button"
        onClick={onClick}
        tabIndex={0}
      >
        <Icon />
      </div>
    </div>
  );
};
