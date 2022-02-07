//TODO: understand
import type { IContentResolver } from './ContentResolver';
import type { EditorCommands } from 'wix-rich-content-common';

export type IToolbarItem = {
  id: string;
  type: 'textColorIndicator' | 'toggle' | 'font' | 'imageSettings' | 'textType';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  presentation?: Record<string, any>;
  attributes: Record<string, string | boolean | number>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  commands: Record<string, (...args: any) => void>;
};

type Modify<T, R> = Omit<T, keyof R> & R;

export type ToolbarSpec = (toolbarItem: IToolbarItem) => boolean;

type Command = ({
  attributes,
  editorCommands,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attributes: any;
  editorCommands: {
    commands: EditorCommands;
  };
}) => (args) => void;

export type IToolbarItemConfig = Modify<
  IToolbarItem,
  {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    attributes: Record<string, any>;
    commands: Record<string, Command>;
  }
>;

export type ToolbarItemProps = {
  toolbarItem: IToolbarItem;
};
