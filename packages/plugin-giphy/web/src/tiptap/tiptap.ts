import { CreateRicosExtensions, TIPTAP_GIF_TYPE } from 'wix-tiptap-editor';
import { Gif as Component } from './component';
import gifDataDefaults from 'ricos-schema/dist/statics/gif.defaults.json';

const name = TIPTAP_GIF_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...gifDataDefaults, id: '' },
    createExtensionConfig: () => ({
      name,
      defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
