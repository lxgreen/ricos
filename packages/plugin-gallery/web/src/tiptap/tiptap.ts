import { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Gallery as Component } from './component';
import galleryDataDefaults from 'ricos-schema/dist/statics/gallery.defaults.json';
import { TIPTAP_GALLERY_TYPE } from 'ricos-content';

const name = TIPTAP_GALLERY_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: {
      ...galleryDataDefaults,
      loading: {
        default: false,
      },
    },
    createExtensionConfig: () => ({
      name,
      group: 'block',
      selectable: true,
      draggable: true,
      addOptions: () => defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
