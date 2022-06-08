import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';

export const getAddButtons = (config): AddButton[] => {
  return [
    {
      id: 'gallery',
      label: INSERT_PLUGIN_BUTTONS.GALLERY,
      icon: InsertPluginIcon,
      tooltip: 'GalleryPlugin_InsertButton_Tooltip',
      command: editorCommands => {
        return true;
      },
      menuConfig: {
        tags: 'Gallery_plugin_search_tags',
      },
    },
  ];
};
