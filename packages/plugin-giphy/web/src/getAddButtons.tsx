import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';
import { DEFAULTS } from './constants';
import InsertModal from './modals/InsertModal';
import { gifModals } from './types';

export const getAddButtons = (config): AddButton[] => {
  return [
    {
      label: INSERT_PLUGIN_BUTTONS.GIF,
      icon: InsertPluginIcon,
      tooltip: 'GiphyPlugin_InsertButton_Tooltip',
      command: editorCommands => true,
      modal: {
        id: gifModals.insert,
        Component: decorateComponentWithProps(InsertModal, {
          ...config,
          componentData: DEFAULTS,
        }),
        groups: ['popover'],
      },
      menuConfig: {
        tags: 'Gif_plugin_search_tags',
      },
    },
  ];
};
