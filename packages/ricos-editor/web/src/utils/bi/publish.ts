import { Version } from 'wix-rich-content-common';
import { getEditorContentSummary } from 'wix-rich-content-editor-common';
import type { DraftContent, BICallbacks } from 'ricos-types';

export const publishBI = (draftContent: DraftContent, onPublish: BICallbacks['onPublish']) => {
  const { pluginsCount, pluginsDetails } = getEditorContentSummary(draftContent) || {};
  onPublish?.(undefined, pluginsCount, pluginsDetails, Version.currentVersion, draftContent.ID);
};
