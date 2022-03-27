import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Gallery as Component } from './component';
import galleryDataDefaults from 'ricos-schema/dist/statics/gallery.defaults.json';
import { TIPTAP_GALLERY_TYPE } from 'ricos-content';

const name = TIPTAP_GALLERY_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    name,
    groups: ['react', 'spoilerable'],
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...galleryDataDefaults,
          loading: {
            default: false,
          },
          loadingPercentage: {
            default: null,
          },
        }),
        addOptions: () => defaultOptions,
        addCommands() {
          return {};
        },
      };
    },
  },
];
