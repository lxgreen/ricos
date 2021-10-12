import { CreateRicosExtensions, TIPTAP_GALLERY_TYPE } from 'wix-tiptap-editor';
import { Gallery as Component } from './component';
import { GalleryData } from 'ricos-schema';

const name = TIPTAP_GALLERY_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...GalleryData.fromJSON({}), id: '' },
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
