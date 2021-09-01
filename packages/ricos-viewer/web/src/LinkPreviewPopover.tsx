import React from 'react';
import { LinkPreviewPopover } from 'wix-rich-content-link-preview-popover';
import { LinkPreviewData } from 'wix-rich-content-common';
import './linkPreviewPopoverStyles.css';
interface Props {
  container: HTMLElement;
  fetchUrlPreviewData: (url: string) => Promise<LinkPreviewData>;
}

const PreviewPopover: React.FC<Props> = ({ container, fetchUrlPreviewData }) => {
  return <LinkPreviewPopover container={container} fetchUrlPreviewData={fetchUrlPreviewData} />;
};

export default PreviewPopover;
