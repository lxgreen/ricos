import { InsertPluginIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';
import { GALLERY_TYPE } from './types';
import { GalleryPluginService } from './toolbar/galleryPluginService';
import { Uploader } from 'wix-rich-content-plugin-commons';
import { GALLERY_LAYOUTS, layoutRicosData } from './layout-data-provider';

const galleryPluginService = new GalleryPluginService();

const defaultData = {
  items: [],
  options: layoutRicosData[GALLERY_LAYOUTS.GRID],
};

const handleExternalFileChange =
  (editorCommands, updateService) =>
  ({ data }) => {
    const nodeId = editorCommands.insertBlockWithBlankLines?.(GALLERY_TYPE, defaultData);
    if (data instanceof Array) {
      data.forEach(file => {
        setTimeout(() => {
          updateService.updatePluginData(
            { data: file },
            nodeId,
            GALLERY_TYPE,
            galleryPluginService
          );
        });
      });
    } else {
      updateService.updatePluginData({ data }, nodeId, GALLERY_TYPE, galleryPluginService);
    }
  };

const handleNativeFileChange = (editorCommands, uploadService, uploader) => (files: File[]) => {
  const nodeId = editorCommands.insertBlockWithBlankLines?.(GALLERY_TYPE, defaultData);
  files.forEach(file => {
    uploadService.uploadFile(file, nodeId, uploader, GALLERY_TYPE, galleryPluginService);
  });
};

export const getAddButtons = (config): AddButton[] => {
  return [
    {
      id: 'gallery',
      label: INSERT_PLUGIN_BUTTONS.GALLERY,
      icon: InsertPluginIcon,
      tooltip: 'GalleryPlugin_InsertButton_Tooltip',
      command: (editorCommands, uploadContext) => {
        if (uploadContext) {
          const { uploadService, updateService } = uploadContext;
          if (config.handleFileSelection) {
            config.handleFileSelection(
              undefined,
              !!config.multi,
              handleExternalFileChange(editorCommands, updateService),
              undefined,
              defaultData
            );
          } else {
            const { accept = '*', multi = true, handleFileUpload } = config;
            uploadService?.selectFiles(
              accept,
              multi,
              handleNativeFileChange(editorCommands, uploadService, new Uploader(handleFileUpload))
            );
          }
          return true;
        }
        return false;
      },
      menuConfig: {
        tags: 'Gallery_plugin_search_tags',
      },
    },
  ];
};
