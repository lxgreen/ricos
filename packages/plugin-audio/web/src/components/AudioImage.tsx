import React from 'react';
import styles from '../../statics/styles/audio.scss';
import classNames from 'classnames';
import { Image } from 'wix-rich-content-ui-components';
import { getImageSrc } from 'wix-rich-content-common/libs/imageUtils';

const AudioImage = ({ getImageUrl, coverImage, isSmallImage }) => {
  return (
    <Image
      src={getImageSrc(coverImage, getImageUrl, {
        requiredWidth: 84,
        requiredHeight: 84,
        requiredQuality: 70,
      })}
      className={classNames(styles.audio_coverImg, {
        [styles.audio_small_cover_image]: isSmallImage,
      })}
      resizeMode={'cover'}
      theme={styles}
    />
  );
};

export default AudioImage;
