import type { Editor, JSONContent } from '@tiptap/react';
import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { ElementType } from 'react';
import type {
  DraftContent,
  EditorCommands,
  EditorContextType,
  Pubsub,
  ToolbarType,
  TranslationFunction,
  RichContentTheme,
  EditorStyleClasses,
} from 'wix-rich-content-common';
import type { Extensions } from './models/Extensions';
// import type { RicosExtension } from 'ricos-tiptap-types';

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
  extensions?: Extensions;
  onLoad?: (editor: Editor) => void;
  t: TranslationFunction;
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  onBlur?: () => void;
  editorStyleClasses?: EditorStyleClasses;
  onSelectionUpdate?: ({
    selectedNodes,
    content,
  }: {
    selectedNodes: ProseMirrorNode[];
    content: DraftContent;
  }) => void;
  theme?: RichContentTheme;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
