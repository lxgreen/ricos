import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Gif as Component } from './component';
import gifDataDefaults from 'ricos-schema/dist/statics/gif.defaults.json';
import { TIPTAP_GIF_TYPE } from 'ricos-content';

const name = TIPTAP_GIF_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    name,
    groups: ['react'],
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => gifDataDefaults,
        addOptions: () => defaultOptions,
        addCommands() {
          return {};
        },
      };
    },
  },
];
