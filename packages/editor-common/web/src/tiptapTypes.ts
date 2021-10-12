import { Node as ProseMirrorNode } from 'prosemirror-model';
import {
  ComponentData,
  EditorCommands,
  LegacyEditorPluginConfig,
  RichContentTheme,
} from 'wix-rich-content-common';

export interface PluginProps {
  context: {
    isMobile: boolean;
    theme: RichContentTheme;
    t: (key: string) => string;
    config: LegacyEditorPluginConfig;
    iframeSandboxDomain: string;
    anchorTarget?: string;
    relValue?: string;
  };
  componentData: ComponentData;
  node: ProseMirrorNode;
  editorCommands: EditorCommands;
  updateAttributes: (data: unknown) => null;
}
