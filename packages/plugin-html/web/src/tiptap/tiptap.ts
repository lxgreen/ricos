import htmlDataDefaults from 'ricos-schema/dist/statics/html.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Html as Component } from './component';
import { TIPTAP_HTML_TYPE } from 'ricos-content';

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    name: TIPTAP_HTML_TYPE,
    groups: ['react'],
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        atom: false,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => htmlDataDefaults,
        addOptions: () => defaultOptions,
      };
    },
  },
];
