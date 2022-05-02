import React from 'react';
import { CirclePlusIcon as PlusIcon } from 'wix-rich-content-ui-components';
import classNames from 'classnames';
import styles from '../../../statics/styles/floating-add-plugin-menu.scss';

type AddButtonProps = {
  isMobile: boolean;
  onClick: () => void;
  buttonRef: React.RefObject<HTMLButtonElement>;
  position?: { top: string };
};

const AddButton = ({ position, isMobile, buttonRef, onClick }: AddButtonProps) => (
  <button
    ref={buttonRef}
    onClick={onClick}
    className={classNames(styles.floatingAddPluginMenu_button, {
      [styles.floatingAddPluginMenu_button_mobile]: isMobile,
    })}
    style={position}
  >
    <PlusIcon />
  </button>
);

export default AddButton;
