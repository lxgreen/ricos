import EmojiPluginIcon from './icons/EmojiPluginIcon';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import InsertModal from './modals/InsertModal';
import type { AddButton } from 'ricos-types';
import { emojiModals } from './types';

export const getAddButtons = (config): AddButton[] => {
  return [
    {
      id: 'emoji',
      label: INSERT_PLUGIN_BUTTONS.EMOJI,
      icon: EmojiPluginIcon,
      tooltip: 'EmojiPlugin_InsertButton_Tooltip',
      command: editorCommands => true,
      modal: {
        id: emojiModals.insert,
        Component: InsertModal,
        layout: 'popover',
      },
      menuConfig: {
        tags: 'Emoji_plugin_search_tags',
      },
    },
  ];
};
