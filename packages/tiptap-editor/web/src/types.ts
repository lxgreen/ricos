import { ElementType } from 'react';
import { Editor, JSONContent } from '@tiptap/react';
import {
  EditorCommands,
  ToolbarType,
  EditorContextType,
  Pubsub,
  EditorPluginConfig,
  TranslationFunction,
  DraftContent,
  RicosTiptapExtension,
} from 'wix-rich-content-common';

import { Node as ProseMirrorNode } from 'prosemirror-model';

export interface PluginProps {
  context: {
    isMobile: boolean;
    theme: string;
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
    MobileToolbar: ElementType;
    TextToolbar: ElementType;
  };
  getToolbarProps: (
    type: ToolbarType
  ) => {
    buttons?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    context?: EditorContextType;
    pubsub?: Pubsub;
  }; // to be deprecated
  destroy: Editor['destroy'];
};

export interface RicosTiptapEditorProps {
  content?: JSONContent;
  extensions?: RicosTiptapExtension[];
  onLoad?: (editor: Editor) => void;
  t: TranslationFunction;
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
