import { CreateRicosExtensions, TIPTAP_FILE_TYPE } from 'wix-tiptap-editor';
import { File as Component } from './component';
import fileDataDefaults from 'ricos-schema/dist/statics/file.defaults.json';

const name = TIPTAP_FILE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...fileDataDefaults, id: '' },
    createExtensionConfig: () => ({
      name,
      atom: false,
      defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
