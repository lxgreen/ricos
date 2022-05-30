import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';

export const getAddButtons = (config): AddButton[] => {
  return [
    {
      id: 'file-upload',
      label: INSERT_PLUGIN_BUTTONS.FILE,
      icon: InsertPluginIcon,
      tooltip: 'FileUploadInsertButton_tooltip',
      command: editorCommands => true,
      menuConfig: {
        tags: 'UploadFile_plugin_search_tags',
      },
    },
  ];
};
