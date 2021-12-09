import dividerDataDefaults from 'ricos-schema/dist/statics/divider.defaults.json';
import { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Divider as Component } from './component';
import { TIPTAP_DIVIDER_TYPE } from 'ricos-content';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...dividerDataDefaults, id: '' },
    createExtensionConfig: () => ({
      name: TIPTAP_DIVIDER_TYPE,
      addOptions: () => defaultOptions,
    }),
  },
];
