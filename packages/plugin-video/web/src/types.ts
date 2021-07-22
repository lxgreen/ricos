import {
  EditorPluginConfig,
  ViewerPluginConfig,
  ComponentData,
  TranslationFunction,
  RichContentTheme,
} from 'wix-rich-content-common';

export const VIDEO_TYPE = 'wix-draft-plugin-video';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';

export const videoButtonsTypes = { video: 'video', soundCloud: 'soundCloud', youTube: 'youTube' };
export const mediaTypes = [videoButtonsTypes.soundCloud, videoButtonsTypes.youTube];
export interface VideoPluginEditorConfig extends EditorPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export interface VideoPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export type VideoData = ComponentData & {
  disableDownload?: boolean;
};
export interface VideoSettingsProps {
  componentData: VideoData;
  theme: RichContentTheme;
  t: TranslationFunction;
  isMobile: boolean;
  settings: VideoPluginEditorConfig;
  onSave: () => void;
  onCancel: () => void;
  updateData: (data) => void;
}
