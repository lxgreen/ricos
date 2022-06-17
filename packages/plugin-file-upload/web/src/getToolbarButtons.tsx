import type { PluginToolbarButtons } from 'ricos-types';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';
import { FILE_UPLOAD_TYPE } from './types';
import { Uploader } from 'wix-rich-content-plugin-commons';

export const getToolbarButtons = (config, filePluginService): PluginToolbarButtons => {
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
        id: PLUGIN_TOOLBAR_BUTTON_ID.REPLACE,
        config: {
          tooltip: 'FileUploadReplaceButton_tooltip',
          command: ({ node, uploadContext: { uploadService, updateService } }) => {
            if (config.handleFileSelection) {
              config.handleFileSelection(({ data }) => {
                const file = Array.isArray(data) ? data[0] : data;
                updateService.updatePluginData(
                  { data: file },
                  node.attrs.id,
                  FILE_UPLOAD_TYPE,
                  filePluginService
                );
              });
            } else {
              const { accept = 'image/*', onFileSelected } = config;
              uploadService.selectFiles(accept, false, (files: File[]) =>
                uploadService.uploadFile(
                  files[0],
                  node.attrs.id,
                  new Uploader(onFileSelected),
                  FILE_UPLOAD_TYPE,
                  filePluginService
                )
              );
            }
          },
        },
      },
      {
        id: PLUGIN_TOOLBAR_BUTTON_ID.DELETE,
      },
    ],
  };
};
