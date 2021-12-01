import React from 'react';
import PropTypes from 'prop-types';
import CardContent from './CardContent';
import styles from '../../statics/styles/widget.scss';
import classNames from 'classnames';
import { fixImageSrc } from '../utils';

const Card = props => {
  const { url, content, direction } = props;
  const imageSrc = fixImageSrc(props.imageSrc, 185);
  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className={styles.link} href={url} target="_blank">
      <div
        style={{ direction }}
        className={classNames(styles[direction], styles.container, styles.cardLayout)}
      >
        {imageSrc && (
          <div style={{ backgroundImage: `url(${imageSrc})` }} className={styles.image} />
        )}
        <CardContent {...content} />
      </div>
    </a>
  );
};

Card.propTypes = {
  imageSrc: PropTypes.string,
  content: PropTypes.object,
  direction: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
};

export default Card;
