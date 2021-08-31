/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import styles from '../statics/styles/link-preview-popover.rtlignore.scss';
import addLinkPreviewPopoverListener from './LinkPreviewPopoverListener';
import LinkPreviewPopoverViewer from './LinkPreviewPopoverViewer';
import { LinkPreviewData } from 'wix-rich-content-common';

interface Position {
  top: number;
  left: number;
}

type LinkNodePreviewData = {
  position: Position;
  data: LinkPreviewData;
};

interface Props {
  container: HTMLElement;
  fetchUrlPreviewData: (url: string) => Promise<LinkPreviewData>;
}

export const LinkPreviewPopover: FC<Props> = ({ container, fetchUrlPreviewData }) => {
  const [linkPreviewData, setLinkPreviewData] = useState<LinkNodePreviewData | null>(null);

  const onPreview = (url: string, position?: Position) => {
    position
      ? fetchUrlPreviewData(url).then(data => setLinkPreviewData({ position, data }))
      : setLinkPreviewData(null);
  };
  useEffect(() => {
    if (container) {
      return addLinkPreviewPopoverListener(container, onPreview);
    }
  }, []);

  return (
    linkPreviewData && (
      <div className={styles.container} style={linkPreviewData.position}>
        <LinkPreviewPopoverViewer {...linkPreviewData.data} />
      </div>
    )
  );
};
