/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import type { ToolbarItemProps } from '../../../types';
import styles from './ToggleButton.scss';
import { withToolbarContext } from '../../../utils/withContext';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { getTooltip } from '../tooltipUtils';

const ToggleButton = ({ toolbarItem, onClick, context }: ToolbarItemProps) => {
  const { isMobile, t } = context || {};

  const Icon = toolbarItem.presentation?.icon;

  const tooltipShortcutKey = toolbarItem.presentation?.tooltipShortcut;
  const tooltipKey = toolbarItem.presentation?.tooltip;

  const tooltip = t && getTooltip(t, tooltipKey, tooltipShortcutKey);

  return (
    <Tooltip key={tooltip} content={tooltip} tooltipOffset={{ x: 0, y: -8 }}>
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
    </Tooltip>
  );
};

export default withToolbarContext(ToggleButton);
