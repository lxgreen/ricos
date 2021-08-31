import React, { FC } from 'react';
import styles from '../statics/styles/link-preview-popover.rtlignore.scss';
import { LinkPreviewData } from 'wix-rich-content-common';

const LinkPreviewPopoverViewer: FC<LinkPreviewData> = ({
  title,
  description,
  provider_url,
  thumbnail_url,
}) => (
  <div className={styles.viewerContainer}>
    {thumbnail_url ? (
      <div className={styles.imageWrapper}>
        <img className={styles.image} src={thumbnail_url} alt="" />
      </div>
    ) : null}
    <div className={styles.texts}>
      <div className={styles.url}>{provider_url}</div>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </div>
  </div>
);

export default LinkPreviewPopoverViewer;
