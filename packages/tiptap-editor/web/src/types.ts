import { FC } from 'react';
import { Editor } from '@tiptap/react';

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

export interface RicosConfigWithType<T extends ExtensionType> {
  extensionType: T;
}
