import { createNodeExtension } from 'wix-rich-content-editor-common';
import { Divider as Component } from './component';

export const tiptapExtensions = [
  createNodeExtension({
    Component,
    createComponentDataDefaults: ({ DividerData }) => DividerData.fromJSON({}),
    createConfig: () => ({
      name: 'divider',
    }),
  }),
];
