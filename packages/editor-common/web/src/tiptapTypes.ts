import type {
  ComponentData,
  LegacyEditorPluginConfig,
  RichContentTheme,
} from 'wix-rich-content-common';
import type { NodeViewRendererProps } from '@tiptap/core';
export type PluginProps = NodeViewRendererProps & {
  context: {
    isMobile: boolean;
    theme: RichContentTheme;
    t: (key: string) => string;
    config: LegacyEditorPluginConfig;
    iframeSandboxDomain: string;
  };
  componentData: ComponentData;
  updateAttributes: (data: unknown) => null;
  selected: boolean;
};
