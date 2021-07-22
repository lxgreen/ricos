import React, { FunctionComponent } from 'react';
import { DraftContent, RicosEditor } from 'ricos-editor';
import { pluginLink } from 'wix-rich-content-plugin-link';

const linkConfig = {
  linkTypes: { anchor: false },
};

const linkPanelSettings = {
  showNewTabCheckbox: true,
  showNoFollowCheckbox: true,
  showSponsoredCheckbox: true,
};

const basicLinkPanelSettings = {
  showNewTabCheckbox: false,
  showNoFollowCheckbox: false,
  showSponsoredCheckbox: false,
};

const BasicLinkEditor: FunctionComponent<{ content?: DraftContent; isMobile: boolean }> = ({
  content,
  isMobile,
}) => (
  <RicosEditor
    plugins={[pluginLink(linkConfig)]}
    linkPanelSettings={basicLinkPanelSettings}
    content={content}
    isMobile={isMobile}
  />
);

const BasicLinkEditorWithSettings: FunctionComponent<{
  content?: DraftContent;
  isMobile: boolean;
}> = ({ content, isMobile }) => (
  <RicosEditor
    plugins={[pluginLink(linkConfig)]}
    linkPanelSettings={linkPanelSettings}
    content={content}
    isMobile={isMobile}
  />
);

const MultiSelectLinkEditor: FunctionComponent<{ content?: DraftContent; isMobile: boolean }> = ({
  content,
  isMobile,
}) => (
  <RicosEditor
    plugins={[pluginLink()]}
    linkPanelSettings={linkPanelSettings}
    content={content}
    isMobile={isMobile}
  />
);

export { BasicLinkEditor, BasicLinkEditorWithSettings, MultiSelectLinkEditor };
