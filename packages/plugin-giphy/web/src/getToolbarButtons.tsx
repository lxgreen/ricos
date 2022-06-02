import { TrashIcon } from 'wix-rich-content-ui-components';
import type { PluginToolbarButtons } from 'ricos-types';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';

const RESOLVER_IDS = {
  SELECTED: 'IS_GIF_SELECTED',
};

export const getToolbarButtons = (config): PluginToolbarButtons => {
  return {
    buttons: [
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_LEFT,
      },
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.DELETE,
        // type: 'toggle',
        // config: {
        // icon: TrashIcon,
        // tooltip: 'Delete',
        // command: editorCommands => editorCommands.chain().focus().deleteSelection().run(),
        // attributes: {
        //   visible: RESOLVER_IDS.SELECTED,
        // },
        // },
      },
    ],
    // resolvers: {
    //   [RESOLVER_IDS.SELECTED]: content => content.length === 1 && content[0].type.name === 'gif',
    // },
  };
};
