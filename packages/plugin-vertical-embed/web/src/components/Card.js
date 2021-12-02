import React, { useState } from 'react';
import PropTypes from 'prop-types';
import CardContent from './CardContent';
import styles from '../../statics/styles/widget.scss';
import classNames from 'classnames';
import { getScaleImageSrc } from 'wix-rich-content-common/libs/imageUtils';

const Card = props => {
  const { url, content, direction } = props;
  const [imageSrc, setImageSrc] = useState();

  const setRef = ref =>
    ref && setImageSrc(getScaleImageSrc(props.imageSrc, 185, ref.getBoundingClientRect().height));

  return (
    // eslint-disable-next-line react/jsx-no-target-blank
    <a className={styles.link} href={url} target="_blank" ref={setRef}>
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
