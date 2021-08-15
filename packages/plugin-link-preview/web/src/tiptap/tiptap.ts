import { CreateRicosExtensions } from 'wix-rich-content-common';
import { LinkPreview as Component } from './component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    // linkPreview: {};
  }
}

const name = 'linkPreview';

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    createComponentDataDefaults: ({ LinkPreviewData }) => LinkPreviewData.fromJSON({}),
    createExtensionConfig: () => ({
      name,
      atom: false,
      addCommands() {
        return {};
      },
    }),
  },
];
