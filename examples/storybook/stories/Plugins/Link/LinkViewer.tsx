import React, { FunctionComponent } from 'react';
import { DraftContent, RicosViewer } from 'ricos-viewer';
import { pluginLink } from 'wix-rich-content-plugin-link';

const linkConfigWithAnchor = {
  linkTypes: { anchor: true },
};

const linkConfig = {
  linkTypes: { anchor: false },
};

const BasicLinkViewer: FunctionComponent<{ content?: DraftContent; isMobile: boolean }> = ({
  content,
  isMobile,
}) => <RicosViewer plugins={[pluginLink(linkConfig)]} content={content} isMobile={isMobile} />;
const MultiSelectLinkViewer: FunctionComponent<{ content?: DraftContent; isMobile: boolean }> = ({
  content,
  isMobile,
}) => (
  <RicosViewer plugins={[pluginLink(linkConfigWithAnchor)]} content={content} isMobile={isMobile} />
);

export { BasicLinkViewer, MultiSelectLinkViewer };
