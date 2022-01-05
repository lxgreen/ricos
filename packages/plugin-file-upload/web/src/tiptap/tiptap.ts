import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { File as Component } from './component';
import fileDataDefaults from 'ricos-schema/dist/statics/file.defaults.json';
import { TIPTAP_FILE_TYPE } from 'ricos-content';

const name = TIPTAP_FILE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: {
      ...fileDataDefaults,
      loading: {
        default: false,
      },
    },
    createExtensionConfig: () => ({
      name,
      group: 'block',
      selectable: true,
      draggable: true,
      addOptions: () => defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
