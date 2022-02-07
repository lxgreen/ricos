// import { ContentResolver } from './ContentResolver';
import { BoldIcon, ItalicIcon, UnderlineIcon } from '../icons';

import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
} from '../resolvers/draftResolvers';
import type { IToolbarItemConfig } from '../types';

export const draftStaticToolbarConfig: IToolbarItemConfig[] = [
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
          editorCommands.commands.toggleInlineStyle('bold');
          editorCommands.commands.focus();
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
          editorCommands.commands.toggleInlineStyle('italic');
          editorCommands.commands.focus();
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
          editorCommands.commands.toggleInlineStyle('underline');
          editorCommands.commands.focus();
        },
    },
  },
];
