import { CreateTiptapExtension } from 'wix-rich-content-common';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { DraftContent } from 'ricos-content';
import { FC } from 'react';
import { Editor, NodeConfig, MarkConfig, ExtensionConfig } from '@tiptap/react';

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

export type TiptapConfig = {
  onUpdate?: ({ content }: { content: DraftContent }) => void;
  initialContent: DraftContent;
  ricosExtensions: (
    | (() => CreateTiptapExtension<NodeConfig | MarkConfig | ExtensionConfig>)
    | undefined
  )[];
};

export type TiptapAPI = {
  blur: () => void;
  focus: () => void;
  // eslint-disable-next-line
  getEditorCommands: () => any; // EditorCommands;
  getToolbars: () => Record<string, FC>;
  // eslint-disable-next-line
  getToolbarProps: () => Record<string, any>; // to be deprecated
  destroy: Editor['destroy'];
};

export interface RicosNodeConfig extends ExtensionConfig {}

export interface RicosExtensionConfig extends ExtensionConfig {
  priority: number;
  addNodeViewHOC?: (
    Component
  ) => {
    nodeTypes: string[];
    nodeViewHOC: unknown;
  };
}
