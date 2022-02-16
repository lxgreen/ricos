import dividerDataDefaults from 'ricos-schema/dist/statics/divider.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Divider as Component } from './component';
import { TIPTAP_DIVIDER_TYPE } from 'ricos-content';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component,
    componentDataDefaults: dividerDataDefaults,
    createExtensionConfig: () => ({
      name: TIPTAP_DIVIDER_TYPE,
      group: 'block',
      selectable: true,
      draggable: true,
      addOptions: () => defaultOptions,
    }),
  },
];
