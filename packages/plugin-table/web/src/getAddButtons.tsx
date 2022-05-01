import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS, decorateComponentWithProps } from 'wix-rich-content-editor-common';
import InsertModal from './modals/InsertModal';
import type { AddButton } from 'ricos-types';
import { getDefaultsSettings } from './tableUtil';
import { tableModals } from './types';

export const getAddButtons = (): AddButton[] => {
  return [
    {
      label: INSERT_PLUGIN_BUTTONS.TABLE,
      icon: InsertPluginIcon,
      tooltip: 'TablePlugin_InsertButton_Tooltip',
      command: editorCommands => true,
      modal: {
        id: tableModals.insert,
        Component: decorateComponentWithProps(InsertModal, {
          componentData: getDefaultsSettings(),
        }),
        groups: ['dialog'],
      },
      menuConfig: {
        tags: 'Table_plugin_search_tags',
      },
    },
  ];
};
