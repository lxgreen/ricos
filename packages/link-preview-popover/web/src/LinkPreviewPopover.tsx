import React, { FC, useEffect, useState } from 'react';
import styles from '../statics/styles/link-preview-popover.rtlignore.scss';
import addLinkPreviewPopoverListener from './LinkPreviewPopoverListener';
import LinkPreviewPopoverViewer from './LinkPreviewPopoverViewer';
import { LinkPreviewData } from 'wix-rich-content-common';
import { Position } from './types';

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
  useEffect(
    () =>
      container &&
      addLinkPreviewPopoverListener(container, (url, position) =>
        position
          ? fetchUrlPreviewData(url).then(data => setLinkPreviewData({ position, data }))
          : setLinkPreviewData(null)
      ),
    []
  );

  return (
    linkPreviewData && (
      <div className={styles.container} style={linkPreviewData.position}>
        <LinkPreviewPopoverViewer {...linkPreviewData.data} />
      </div>
    )
  );
};
