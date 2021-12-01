import { ComponentData, LegacyEditorPluginConfig, RichContentTheme } from 'wix-rich-content-common';
import { NodeViewRendererProps } from '@tiptap/core';
export type PluginProps = NodeViewRendererProps & {
  context: {
    isMobile: boolean;
    theme: RichContentTheme;
    t: (key: string) => string;
    config: LegacyEditorPluginConfig;
  };
  componentData: ComponentData;
  updateAttributes: (data: unknown) => null;
};
