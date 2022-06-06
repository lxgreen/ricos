import { TrashIcon, AlignLeftIcon, SettingsIcon } from '../icons';
import type { IPluginToolbarButtonsConfig } from '../types';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';
import { getNodeInSelectionResolver } from '../resolvers/tiptapResolvers';

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
          editorCommands.chain().focus().setNodeAlignment('LEFT').run();
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
};
