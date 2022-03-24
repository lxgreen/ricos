import dividerDataDefaults from 'ricos-schema/dist/statics/divider.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Divider as Component } from './component';
import { TIPTAP_DIVIDER_TYPE } from 'ricos-content';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component,
    name: TIPTAP_DIVIDER_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => dividerDataDefaults,
        addOptions: () => defaultOptions,
      };
    },
  },
];
