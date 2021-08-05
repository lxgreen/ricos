import { createRicosNodeExtensionConfig } from 'wix-rich-content-editor-common';
import { Divider as Component } from './component';

export const tiptapExtensions = [
  createRicosNodeExtensionConfig({
    Component,
    createComponentDataDefaults: ({ DividerData }) => DividerData.fromJSON({}),
    createConfig: () => ({
      name: 'divider',
    }),
  }),
];
