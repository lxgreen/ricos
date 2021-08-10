import { CreateRicosExtensions } from 'wix-rich-content-common';
import { Divider as Component } from './component';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    createComponentDataDefaults: ({ DividerData }) => DividerData.fromJSON({}),
    createExtensionConfig: () => ({
      name: 'divider',
      defaultOptions,
    }),
  },
];
