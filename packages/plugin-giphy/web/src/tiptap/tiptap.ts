import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Gif as Component } from './component';
import { GIFData } from 'ricos-schema';

const name = 'gif';

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...GIFData.fromJSON({}), id: '' },
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
