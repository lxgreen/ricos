import React from 'react';
import { parseLink } from 'ricos-content/libs/nodeUtils';
import styles from './UrlLinkButton.scss';
import { normalizeUrl } from 'wix-rich-content-common';

const UrlLinkButton = ({ toolbarItem }) => {
  const selectedLinkData = toolbarItem.attributes.selectedLinkData;
  const { url = '', rel = '', target = '_self' } = parseLink(selectedLinkData);
  const href = normalizeUrl(url);

  return (
    <div className={styles.toolbarUrlContainer}>
      <a
        href={href}
        rel={rel}
        target={target}
        className={styles.toolbarUrl}
        onMouseDown={event => event.preventDefault()}
      >
        {url}
      </a>
    </div>
  );
};

export default UrlLinkButton;
