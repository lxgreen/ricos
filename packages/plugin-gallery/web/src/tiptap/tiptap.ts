import { CreateRicosExtensions, TIPTAP_GALLERY_TYPE } from 'wix-tiptap-editor';
import { Gallery as Component } from './component';
import galleryDataDefaults from 'ricos-schema/dist/statics/gallery.defaults.json';

const name = TIPTAP_GALLERY_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: {
      ...galleryDataDefaults,
      id: '',
      myLoading: {
        default: false,
      },
    },
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
