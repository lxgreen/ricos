/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import type { ToolbarItemProps } from '../../../types';
import styles from './ToggleButton.scss';
import { withToolbarContext } from '../../../utils/withContext';

const ToggleButton = ({ toolbarItem, onClick, context }: ToolbarItemProps) => {
  const { isMobile } = context || {};

  const Icon = toolbarItem.presentation?.icon;
  return (
    <div
      className={cx(styles.toggleButtonWrapper, {
        [styles.mobileToggleButtonWrapper]: isMobile,
        [styles.active]: toolbarItem.attributes.active,
        [styles.disabled]: toolbarItem.attributes.disabled,
      })}
    >
      <div
        onMouseDown={e => e.preventDefault()}
        className={cx(styles.toggleButton, { [styles.mobileToggleButton]: isMobile })}
        role="button"
        onClick={onClick}
        tabIndex={0}
      >
        <Icon />
      </div>
    </div>
  );
};

export default withToolbarContext(ToggleButton);
