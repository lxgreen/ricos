import { EditorPluginConfig, ViewerPluginConfig } from 'wix-rich-content-common';
import { LinkPreviewProviders } from './consts';

export const LINK_PREVIEW_TYPE = 'wix-draft-plugin-link-preview';

export interface LinkPreviewPluginEditorConfig extends EditorPluginConfig {
  alignment?: string;
  size?: string;
  link?: {
    target?: string;
    rel?: string;
  };
  fetchData?: (
    url: string
  ) => Promise<{ thumbnail_url?: string; title?: string; description?: string; html?: string }>;
  enableEmbed?: boolean | LinkPreviewProviders[];
  exposeEmbedButtons?: LinkPreviewProviders[];
  enableLinkPreview?: boolean;
}
export interface LinkPreviewPluginViewerConfig extends ViewerPluginConfig {
  [key: string]: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
