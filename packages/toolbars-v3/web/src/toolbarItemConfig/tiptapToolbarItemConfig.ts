// import { ContentResolver } from './ContentResolver';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '../icons';
import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
} from '../resolvers/tiptapResolvers';
import type { IToolbarItemConfigTiptap } from '../types';
export const tiptapStaticToolbarConfig: IToolbarItemConfigTiptap[] = [
  {
    id: 'bold',
    type: 'toggle',
    presentation: {
      tooltip: 'Bold',
      icon: BoldIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsBoldResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().toggleBold().run();
        },
    },
  },
  {
    id: 'italic',
    type: 'toggle',
    presentation: {
      tooltip: 'Italic',
      icon: ItalicIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsItalicResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().toggleItalic().run();
        },
    },
  },
  {
    id: 'underline',
    type: 'toggle',
    presentation: {
      tooltip: 'Underline',
      icon: UnderlineIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsUnderlineResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().toggleUnderline().run();
        },
    },
  },
];
