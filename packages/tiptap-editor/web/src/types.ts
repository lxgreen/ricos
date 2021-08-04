import { Node as ProseMirrorNode } from 'prosemirror-model';
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

type ExtensionType = 'node' | 'mark' | 'extension';

interface RicosConfig<T extends ExtensionType> {
  extensionType: T;
}
export interface RicosNodeConfig extends NodeConfig, RicosConfig<'node'> {}
export interface RicosMarkConfig extends MarkConfig, RicosConfig<'mark'> {}
export interface RicosGenericExtensionConfig extends ExtensionConfig, RicosConfig<'extension'> {}
