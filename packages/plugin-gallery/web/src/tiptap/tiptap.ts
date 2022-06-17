import { TIPTAP_GALLERY_TYPE } from 'ricos-content';
import galleryDataDefaults from 'ricos-schema/dist/statics/gallery.defaults.json';
import type { ExtensionProps, NodeConfig, RicosExtension } from 'ricos-tiptap-types';
import { Gallery as Component } from './component';

const name = TIPTAP_GALLERY_TYPE;

export const tiptapExtensions = [
  {
    type: 'node' as const,
    name,
    groups: ['react', 'spoilerable'],
    reconfigure: (
      config: NodeConfig,
      _extensions: RicosExtension[],
      _props: ExtensionProps,
      settings: Record<string, unknown>
    ) => ({
      ...config,
      addOptions: () => settings,
    }),
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
        addCommands() {
          return {};
        },
      };
    },
  },
];
