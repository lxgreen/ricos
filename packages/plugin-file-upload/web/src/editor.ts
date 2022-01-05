import { createFileUploadPlugin } from './createFileUploadPlugin';
import type { FilePluginEditorConfig } from './types';
import { FILE_UPLOAD_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createFileData } from './createFileData';
import { createRicosExtensions } from './tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';

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
