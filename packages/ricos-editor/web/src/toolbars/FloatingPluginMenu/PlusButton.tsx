import React from 'react';
import { CirclePlusIcon as PlusIcon } from 'wix-rich-content-ui-components';
import classNames from 'classnames';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';

type PlusButtonProps = {
  isMobile: boolean;
  onClick: () => void;
  position?: { top: string };
};

const PlusButton = React.forwardRef(
  ({ position, isMobile, onClick }: PlusButtonProps, ref: React.RefObject<HTMLButtonElement>) => (
    <button
      ref={ref}
      onClick={onClick}
      className={classNames(styles.floatingAddPluginMenu_plus_button, {
        [styles.floatingAddPluginMenu_plus_button_mobile]: isMobile,
      })}
      style={position}
    >
      <PlusIcon />
    </button>
  )
);

export default PlusButton;
