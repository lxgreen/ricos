import type { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const POLL_TYPE = 'wix-draft-plugin-poll';

export const pollModals = {
  insert: 'pollInsertModal',
};
export interface PollPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface PollPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
