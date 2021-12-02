import { createFileUploadPlugin } from './createFileUploadPlugin';
import { FILE_UPLOAD_TYPE, FilePluginEditorConfig } from './types';
import { DEFAULTS } from './defaults';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createFileData } from './createFileData';
import { createRicosExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'wix-tiptap-editor';

export const pluginFileUpload: EditorPluginCreator<FilePluginEditorConfig> = config => {
  const pluginConfig: FilePluginEditorConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: FILE_UPLOAD_TYPE,
    createPlugin: createFileUploadPlugin,
    ModalsMap: {},
    createPluginData: createFileData,
    configFixer: () =>
      (pluginConfig.uploadHandler =
        pluginConfig.onFileSelected || pluginConfig.handleFileSelection),
    tiptapExtensions: createRicosExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};
