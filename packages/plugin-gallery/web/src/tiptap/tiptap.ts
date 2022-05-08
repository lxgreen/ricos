import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Gallery } from './component';
import galleryDataDefaults from 'ricos-schema/dist/statics/gallery.defaults.json';
import { TIPTAP_GALLERY_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

const name = TIPTAP_GALLERY_TYPE;

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    name,
    groups: ['react', 'spoilerable'],
    Component: decorateComponentWithProps(Gallery, { settings }) as ComponentType<PluginProps>,
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
        addOptions: () => settings,
        addCommands() {
          return {};
        },
      };
    },
  },
];
