import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';

export const getAddButtons = (): AddButton[] => {
  return [
    {
      id: 'collapsibleList',
      icon: InsertPluginIcon,
      label: INSERT_PLUGIN_BUTTONS.COLLAPSIBLE_LIST,
      tooltip: 'CollapsibleListPlugin_InsertButton_Tooltip',
      command: editorCommands => {
        return true;
      },
      menuConfig: {
        tags: 'CollapsibleList_plugin_search_tags',
      },
    },
  ];
};
