import React from 'react';
import cx from 'classnames';
import styles from './ToolbarButtonSeparator.scss';
import { withToolbarContext } from '../../utils/withContext';

const ToolbarButtonSeparator = ({ context }) => {
  const { isMobile } = context || {};

  return <div className={cx(styles.separator, { [styles.mobileSeparator]: isMobile })} />;
};

export default withToolbarContext(ToolbarButtonSeparator);
