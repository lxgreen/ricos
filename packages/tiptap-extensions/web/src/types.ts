import type { Editor, JSONContent } from '@tiptap/react';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type {
  DraftContent,
  LegacyEditorPluginConfig,
  TranslationFunction,
  RichContentTheme,
} from 'wix-rich-content-common';
import type { RicosExtension } from 'ricos-tiptap-types';

export interface PluginProps {
  context: {
    isMobile: boolean;
    t: (key: string) => string;
  };
  // eslint-disable-next-line
  componentData: any;
  node: ProseMirrorNode;
  editorCommands: unknown;
  updateAttributes: (data: unknown) => null;
}

export interface RicosTiptapEditorProps {
  content: JSONContent;
  extensions?: RicosExtension[];
  onLoad?: (editor: Editor) => void;
  t: TranslationFunction;
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  onBlur?: () => void;
  onSelectionUpdate?: ({ selectedNodes }: { selectedNodes: ProseMirrorNode[] }) => void;
  theme?: RichContentTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

export type CreateRicosExtensions = <PluginType extends keyof LegacyEditorPluginConfig>(
  config: LegacyEditorPluginConfig[PluginType]
) => RicosExtension[];
