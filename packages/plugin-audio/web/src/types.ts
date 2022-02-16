import type { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';
export { AUDIO_TYPE } from 'ricos-content';

export interface AudioPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface AudioPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
