//TODO: understand
import type { EditorCommands } from 'wix-rich-content-common';

export type IToolbarItem = {
  id: string;
  type: 'textColorIndicator' | 'toggle' | 'font' | 'imageSettings' | 'textType' | 'modal';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presentation?: Record<string, any>;
  attributes: Record<string, string | boolean | number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Record<string, (...args: any) => void>;
};

type Modify<T, R> = Omit<T, keyof R> & R;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ToolbarSpec = (attributes: Record<string, any>) => boolean;

type Command = ({
  attributes,
  editorCommands,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  editorCommands: {
    commands: EditorCommands;
  };
}) => (...args) => void;

type TiptapCommand = ({
  attributes,
  editorCommands,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
}) => (args) => void;

export type IToolbarItemConfig = Modify<
  IToolbarItem,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes: Record<string, any>;
    commands: Record<string, Command>;
  }
>;

export type IToolbarItemConfigTiptap = Modify<
  IToolbarItem,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes: Record<string, any>;
    commands: Record<string, TiptapCommand>;
  }
>;

export type ToolbarItemProps = {
  toolbarItem: IToolbarItem;
  onClick: (any) => void;
};
