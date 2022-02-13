// import { ContentResolver } from './ContentResolver';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockQuoteIcon,
  CodeBlockIcon,
  OrderedListIcon,
  UnorderedListIcon,
  SpoilerButtonIcon,
  increaseIndentPluginIcon,
  decreaseIndentPluginIcon,
} from '../icons';

import {
  alwaysVisibleResolver,
  isTextContainsBoldResolver,
  isTextContainsItalicResolver,
  isTextContainsUnderlineResolver,
  isTextContainsQuoteResolver,
  isTextContainsCodeblockResolver,
  isTextContainsOrderedListResolver,
  isTextContainsUnorderedListResolver,
  isTextContainsSpoilerResolver,
  getAlignmentInSelectionResolver,
  getHeadingInSelectionResolver,
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
  {
    id: 'quote',
    type: 'toggle',
    presentation: {
      tooltip: 'Quote',
      icon: BlockQuoteIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsQuoteResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.setBlockType('blockquote');
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'codeBlock',
    type: 'toggle',
    presentation: {
      tooltip: 'Code Block',
      icon: CodeBlockIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsCodeblockResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.setBlockType('code-block');
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'orderedList',
    type: 'toggle',
    presentation: {
      tooltip: 'Ordered List',
      icon: OrderedListIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsOrderedListResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.setBlockType('ordered-list-item');
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'unorderedList',
    type: 'toggle',
    presentation: {
      tooltip: 'Unordered List',
      icon: UnorderedListIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsUnorderedListResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.setBlockType('unordered-list-item');
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'textSpoiler',
    type: 'toggle',
    presentation: {
      tooltip: 'Spoiler',
      icon: SpoilerButtonIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
      active: isTextContainsSpoilerResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.toggleInlineStyle('spoiler');
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'increaseIndent',
    type: 'toggle',
    presentation: {
      tooltip: 'Increase indent',
      icon: increaseIndentPluginIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.insertDecoration('ricos-indent', 1);
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'decreaseIndent',
    type: 'toggle',
    presentation: {
      tooltip: 'Decrease indent',
      icon: decreaseIndentPluginIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.commands.insertDecoration('ricos-indent', -1);
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'alignment',
    type: 'modal',
    presentation: {
      tooltip: 'Alignment',
    },
    attributes: {
      visible: alwaysVisibleResolver,
      selectedAlignment: getAlignmentInSelectionResolver,
    },
    commands: {
      selectOption:
        ({ editorCommands }) =>
        alignment => {
          editorCommands.commands.setTextAlignment(alignment);
          editorCommands.commands.focus();
        },
    },
  },
  {
    id: 'heading',
    type: 'modal',
    presentation: {
      tooltip: 'Heading',
    },
    attributes: {
      visible: alwaysVisibleResolver,
      selectedHeading: getHeadingInSelectionResolver,
    },
    commands: {
      selectOption:
        ({ editorCommands }) =>
        heading => {
          editorCommands.commands.setBlockType(heading);
          editorCommands.commands.focus();
        },
    },
  },
];
