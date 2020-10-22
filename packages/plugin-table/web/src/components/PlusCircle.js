import React from 'react';
import { PlusIcon } from '../icons';
import PropTypes from 'prop-types';
import styles from '../../statics/styles/plus-circle.scss';
import classNames from 'classnames';

const PlusCircle = ({ highlightResizer, horizontal, onClick, index }) => {
  const onMouseLeave = () => highlightResizer(false, horizontal);
  const onMouseEnter = () => highlightResizer(index, horizontal);

  return (
    //eslint-disable-next-line
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={classNames(styles.add, !horizontal && styles.addRow)}
      data-hook={`${horizontal ? 'col' : 'row'}Plus-${index}`}
    >
      <div className={styles.icon}>
        <PlusIcon onClick={() => onClick(index + 1)} />
      </div>
    </div>
  );
};

PlusCircle.propTypes = {
  horizontal: PropTypes.bool,
  highlightResizer: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
};

export default PlusCircle;
