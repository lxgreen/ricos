/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import cx from 'classnames';
import styles from '../UrlLinkButton/UrlLinkButton.scss';
import { withToolbarContext } from '../../../utils/withContext';

const onClick = (event, toolbarItem, anchor) => {
  event.preventDefault();
  toolbarItem.commands?.scrollToAnchor(anchor);
};

const AnchorLinkButton = ({ toolbarItem, context }) => {
  const { t } = context || {};
  const selectedLinkData = toolbarItem.attributes.selectedLinkData;
  const { anchor } = selectedLinkData;

  return (
    <div className={styles.toolbarUrlContainer}>
      <div
        className={cx(styles.toolbarUrl, styles.toolbarUrlAnchor)}
        onClick={e => onClick(e, toolbarItem, anchor)}
      >
        {t('LinkTo_Toolbar_GoTo')}
      </div>
    </div>
  );
};

export default withToolbarContext(AnchorLinkButton);
