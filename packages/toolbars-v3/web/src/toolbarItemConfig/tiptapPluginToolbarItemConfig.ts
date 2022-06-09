import {
  TrashIcon,
  AlignLeftIcon,
  SettingsIcon,
  AlignRightIcon,
  AlignJustifyIcon,
  LinkIcon,
} from '../icons';
import type { IPluginToolbarButtonsConfig } from '../types';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';
import {
  getNodeInSelectionResolver,
  isNodeContainsLinkOrAnchorResolver,
} from '../resolvers/tiptapResolvers';
import { createLink } from 'ricos-content/libs/nodeUtils';
import { convertRelObjectToString, convertRelStringToObject } from 'wix-rich-content-common';

export const pluginToolbarButtonsConfig: IPluginToolbarButtonsConfig = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  delete: {
    id: PLUGIN_TOOLBAR_BUTTON_ID.DELETE,
    type: 'toggle',
    presentation: {
      tooltip: 'Delete',
      icon: TrashIcon,
    },
    attributes: {},
    commands: {
      delete:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().deleteSelection().run();
        },
    },
  },
  alignLeft: {
    id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_LEFT,
    type: 'toggle',
    presentation: {
      tooltip: 'Align left',
      icon: AlignLeftIcon,
    },
    attributes: {},
    commands: {
      alignLeft:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().setNodeAlignment('LEFT').setNodeSize('SMALL').run();
        },
    },
  },
  alignRight: {
    id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_RIGHT,
    type: 'toggle',
    presentation: {
      tooltip: 'Align right',
      icon: AlignRightIcon,
    },
    attributes: {},
    commands: {
      alignRight:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().setNodeAlignment('RIGHT').setNodeSize('SMALL').run();
        },
    },
  },
  alignCenter: {
    id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_CENTER,
    type: 'toggle',
    presentation: {
      tooltip: 'Align center',
      icon: AlignJustifyIcon,
    },
    attributes: {},
    commands: {
      alignCenter:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().setNodeAlignment('CENTER').setNodeSize('CONTENT').run();
        },
    },
  },
  settings: {
    id: PLUGIN_TOOLBAR_BUTTON_ID.SETTINGS,
    type: 'modal',
    presentation: {
      tooltip: 'Settings',
      icon: SettingsIcon,
    },
    attributes: {
      selectedNode: getNodeInSelectionResolver,
    },
    commands: {},
  },
  link: {
    id: PLUGIN_TOOLBAR_BUTTON_ID.LINK,
    type: 'modal',
    presentation: {
      tooltip: 'TextLinkButton_Tooltip',
      icon: LinkIcon,
    },
    attributes: {
      selectedNode: getNodeInSelectionResolver,
      active: isNodeContainsLinkOrAnchorResolver,
    },
    commands: {
      insertLink:
        ({ editorCommands, attributes: { selectedNode } }) =>
        linkData => {
          const { rel, target, url } = linkData;
          const relValue = convertRelObjectToString(convertRelStringToObject(rel));
          const link = createLink({ url, rel: relValue, target });
          editorCommands.chain().focus().updateAttributes(selectedNode.type.name, { link }).run();
        },
      insertAnchor:
        ({ editorCommands, attributes: { selectedNode } }) =>
        anchor => {
          editorCommands
            .chain()
            .focus()
            .updateAttributes(selectedNode.type.name, { link: { anchor, target: 'SELF' } })
            .run();
        },
      removeLink:
        ({ editorCommands, attributes: { selectedNode } }) =>
        () => {
          const { link, ...attrs } = selectedNode.attrs;
          editorCommands.chain().focus().updateAttributes(attrs).run();
        },
      removeAnchor:
        ({ editorCommands, attributes: { selectedNode } }) =>
        () => {
          const { link, ...attrs } = selectedNode.attrs;
          editorCommands.chain().focus().updateAttributes(attrs).run();
        },
    },
  },
};
