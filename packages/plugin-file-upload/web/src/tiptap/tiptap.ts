import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { File as Component } from './component';
import fileDataDefaults from 'ricos-schema/dist/statics/file.defaults.json';
import { TIPTAP_FILE_TYPE } from 'ricos-content';

const name = TIPTAP_FILE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    name,
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...fileDataDefaults,
          loading: {
            default: false,
          },
        }),
        addOptions: () => defaultOptions,
        addCommands() {
          return {};
        },
      };
    },
  },
];
