/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import type { FC } from 'react';
import cx from 'classnames';
import styles from './ReplaceButton.scss';
import Tooltip from 'wix-rich-content-common/libs/Tooltip';
import { UploadServiceContext } from 'wix-rich-content-common';
import { withToolbarContext } from '../../../utils/withContext';

type Props = {
  toolbarItem;
  onClick;
  context;
};

const ReplaceButton: FC<Props> = ({ toolbarItem, onClick, context }) => {
  const { isMobile, t } = context || {};
  const uploadContext = useContext(UploadServiceContext);

  const Icon = toolbarItem.presentation?.icon;
  const tooltipKey = toolbarItem.presentation?.tooltip;
  const tooltip = t?.(tooltipKey);
  const nodeId = toolbarItem.attributes.selectedNode.attrs.id;

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
          onClick={() => onClick({ nodeId, ...uploadContext })}
          tabIndex={0}
        >
          <Icon />
        </div>
      </div>
    </Tooltip>
  );
};

export default withToolbarContext(ReplaceButton);
