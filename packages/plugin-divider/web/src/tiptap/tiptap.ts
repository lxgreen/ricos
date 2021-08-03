import { ExtensionBuilder } from 'wix-rich-content-editor-common';
import { Divider as Component } from './component';

export const tiptapExtensions = new ExtensionBuilder()
  .addNode({
    Component,
    createComponentDataDefaults: ({ DividerData }) => DividerData.fromJSON({}),
    createConfig: () => ({
      name: 'divider',
    }),
  })
  .build();
