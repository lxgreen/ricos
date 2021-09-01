import dividerDataDefaults from 'ricos-schema/dist/statics/divider.defaults.json';
import { CreateRicosExtensions } from 'wix-rich-content-common';
import { Divider as Component } from './component';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...dividerDataDefaults, id: '' },
    createExtensionConfig: () => ({
      name: 'ricosDivider',
      defaultOptions,
    }),
  },
];
