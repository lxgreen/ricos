import { CreateRicosExtensions, TIPTAP_FILE_TYPE } from 'wix-tiptap-editor';
import { File as Component } from './component';
import { FileData } from 'ricos-schema';

const name = TIPTAP_FILE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...FileData.fromJSON({}), id: '' },
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
