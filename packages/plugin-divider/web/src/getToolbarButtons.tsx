import type { PluginToolbarButtons } from 'ricos-types';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';

export const getToolbarButtons = (config): PluginToolbarButtons => {
  return {
    buttons: [
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_LEFT,
      },
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_CENTER,
      },
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_RIGHT,
      },
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.DELETE,
      },
    ],
  };
};
