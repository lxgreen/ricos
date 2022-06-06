import { createLink } from 'ricos-content/libs/nodeUtils';
import { convertRelObjectToString, convertRelStringToObject } from 'wix-rich-content-common';
import { EditIcon, TrashIcon } from '../icons';
import {
  alwaysVisibleResolver,
  getLinkData,
  isTextContainsLinkResolver,
  isTextContainsAnchorResolver,
} from '../resolvers/tiptapResolvers';
import type { IToolbarItemConfigTiptap } from '../types';

export const linkToolbarItemConfig: IToolbarItemConfigTiptap[] = [
  {
    id: 'anchorLink',
    type: 'toggle',
    presentation: {
      tooltip: 'anchor link',
    },
    attributes: {
      visible: isTextContainsAnchorResolver,
      selectedLinkData: getLinkData,
    },
    commands: {
      scrollToAnchor:
        ({ editorCommands }) =>
        anchor => {
          editorCommands.chain().focus().scrollToAnchor(anchor).run();
        },
    },
  },
  {
    id: 'urlLink',
    type: 'toggle',
    presentation: {
      tooltip: 'url link',
    },
    attributes: {
      visible: isTextContainsLinkResolver,
      selectedLinkData: getLinkData,
    },
    commands: {},
  },
  {
    id: 'editLink',
    type: 'modal',
    presentation: {
      tooltip: 'LinkTo_Edit_Tooltip',
      icon: EditIcon,
    },
    attributes: {
      visible: alwaysVisibleResolver,
    },
    commands: {
      insertLink:
        ({ editorCommands }) =>
        linkData => {
          const { rel, target, url } = linkData;
          const relValue = convertRelObjectToString(convertRelStringToObject(rel));
          const link = createLink({ url, rel: relValue, target });
          editorCommands.chain().focus().setLink({ link }).run();
        },
      insertAnchor:
        ({ editorCommands }) =>
        anchor => {
          editorCommands.chain().focus().setAnchor(anchor).run();
        },
      removeLink:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().unsetLink().run();
        },
      removeAnchor:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().unsetAnchor().run();
        },
    },
  },
  {
    id: 'removeLink',
    type: 'toggle',
    presentation: {
      tooltip: 'LinkPanelContainer_RemoveButton',
      icon: TrashIcon,
    },
    attributes: {
      visible: isTextContainsLinkResolver,
    },
    commands: {
      removeLink:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().unsetLink().run();
        },
    },
  },
  {
    id: 'removeAnchor',
    type: 'toggle',
    presentation: {
      tooltip: 'LinkPanelContainer_RemoveButton',
      icon: TrashIcon,
    },
    attributes: {
      visible: isTextContainsAnchorResolver,
    },
    commands: {
      removeAnchor:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().unsetAnchor().run();
        },
    },
  },
];
