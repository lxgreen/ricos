import InsertPluginIcon from './icons/InsertPluginIcon';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';
import { DIVIDER_TYPE } from './types';

export const getAddButtons = (): AddButton[] => {
  return [
    {
      icon: InsertPluginIcon,
      label: INSERT_PLUGIN_BUTTONS.DIVIDER,
      tooltip: 'DividerPlugin_InsertButton_Tooltip',
      command: editorCommands => {
        editorCommands.insertBlock(DIVIDER_TYPE, {});
        return true;
      },
      menuConfig: {
        tags: 'Divider_plugin_search_tags',
      },
    },
  ];
};
