import type { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';

export const AUDIO_TYPE = 'audio';

export interface AudioPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AudioPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
