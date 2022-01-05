import type { Editor, JSONContent } from '@tiptap/react';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { ElementType } from 'react';
import type {
  DraftContent,
  EditorCommands,
  EditorContextType,
  LegacyEditorPluginConfig,
  Pubsub,
  ToolbarType,
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

export type TiptapAPI = {
  blur: () => void;
  focus: () => void;
  getEditorCommands: () => EditorCommands;
  getToolbars: () => {
    MobileToolbar?: ElementType;
    TextToolbar?: ElementType;
  };
  getToolbarProps: (type: ToolbarType) => {
    buttons?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    context?: EditorContextType;
    pubsub?: Pubsub;
  }; // to be deprecated
  destroy: Editor['destroy'];
};

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
