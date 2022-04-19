/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import styles from './TitleButton.scss';
import { TitleIcon, TitleOneIcon, TitleTwoIcon } from '../../../icons';
import { withToolbarContext } from '../../../utils/withContext';

const titleStateMap = {
  unstyled: {
    icon: TitleIcon,
    action: 'header-two',
    active: false,
  },
  'header-two': {
    icon: TitleOneIcon,
    action: 'header-three',
    active: true,
  },
  'header-three': {
    icon: TitleTwoIcon,
    action: 'unstyled',
    active: true,
  },
};

const TitleButton = ({ toolbarItem, context }) => {
  const { isMobile } = context || {};
  const selectedHeading = toolbarItem.attributes.selectedHeading;
  const currentTitleState = titleStateMap[selectedHeading] || titleStateMap.unstyled;

  const Icon = currentTitleState.icon;
  const onClick = () => toolbarItem.commands?.setHeading(currentTitleState.action);
  const isActive = currentTitleState.active;

  return (
    <div
      className={cx(styles.titleButtonWrapper, {
        [styles.mobileTitleButtonWrapper]: isMobile,
        [styles.active]: isActive,
      })}
    >
      <div
        onMouseDown={e => e.preventDefault()}
        className={cx(styles.titleButton, { [styles.mobileTitleButton]: isMobile })}
        role="button"
        onClick={onClick}
        tabIndex={0}
      >
        <Icon />
      </div>
    </div>
  );
};

export default withToolbarContext(TitleButton);
