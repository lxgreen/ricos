import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';
import { FILE_UPLOAD_TYPE } from './types';
import { FilePluginService } from './toolbar/filePluginService';
import { Uploader } from 'wix-rich-content-plugin-commons';

const filePluginService = new FilePluginService();

const handleExternalFileChange =
  (editorCommands, updateService) =>
  ({ data }) => {
    if (data instanceof Array) {
      data.forEach((file, index) => {
        setTimeout(() => {
          const nodeId = editorCommands.insertBlockWithBlankLines?.(
            FILE_UPLOAD_TYPE,
            {},
            { updateSelection: data.length === index + 1 }
          );
          updateService.updatePluginData(
            { data: file },
            nodeId,
            FILE_UPLOAD_TYPE,
            filePluginService
          );
        });
      });
    } else {
      const nodeId = editorCommands.insertBlockWithBlankLines?.(FILE_UPLOAD_TYPE, {});
      updateService.updatePluginData({ data }, nodeId, FILE_UPLOAD_TYPE, filePluginService);
    }
  };

const handleNativeFileChange = (editorCommands, uploadService, uploader) => (files: File[]) => {
  files.forEach((file, index) => {
    // prevents rerenders when next file starts uploading
    setTimeout(() => {
      const nodeId = editorCommands.insertBlockWithBlankLines?.(
        FILE_UPLOAD_TYPE,
        {},
        { updateSelection: files.length === index + 1 }
      );
      uploadService.uploadFile(file, nodeId, uploader, FILE_UPLOAD_TYPE, filePluginService);
    });
  });
};

export const getAddButtons = (config): AddButton[] => {
  return [
    {
      id: 'file-upload',
      label: INSERT_PLUGIN_BUTTONS.FILE,
      icon: InsertPluginIcon,
      tooltip: 'FileUploadInsertButton_tooltip',
      command: (editorCommands, uploadContext) => {
        if (uploadContext) {
          const { uploadService, updateService } = uploadContext;
          if (config.handleFileSelection) {
            config.handleFileSelection(handleExternalFileChange(editorCommands, updateService));
          } else {
            const { accept = '*', multi = true, onFileSelected } = config;
            uploadService?.selectFiles(
              accept,
              multi,
              handleNativeFileChange(editorCommands, uploadService, new Uploader(onFileSelected))
            );
          }
          return true;
        }
        return false;
      },
      menuConfig: {
        tags: 'UploadFile_plugin_search_tags',
      },
    },
  ];
};
