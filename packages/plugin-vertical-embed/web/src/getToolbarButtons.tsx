import type { PluginToolbarButtons } from 'ricos-types';
import {
  PLUGIN_TOOLBAR_BUTTON_ID,
  decorateComponentWithProps,
} from 'wix-rich-content-editor-common';
import { verticalEmbedModals } from './constants';
import InsertModal from './modals/InsertModal';

export const getToolbarButtons = (config): PluginToolbarButtons => {
  return {
    buttons: [
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.REPLACE,
        config: {
          command: ({ modalService, isMobile, node, referenceElement }) => {
            modalService?.openModal({
              Component: decorateComponentWithProps(InsertModal, {
                verticalsApi: config.verticalsApi,
                componentData: { type: node.attrs.type.toLowerCase() }, //TODO: convert to draft
                nodeId: node.attrs.id,
              }),
              id: verticalEmbedModals.insert,
              positioning: { placement: 'bottom', referenceElement },
              layout: isMobile ? 'fullscreen' : 'popover',
            });
          },
        },
      },
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.DELETE,
      },
    ],
  };
};
