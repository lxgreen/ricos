import { TIPTAP_IMAGE_TYPE } from 'ricos-content';
import imageDataDefaults from 'ricos-schema/dist/statics/image.defaults.json';
import type { ExtensionProps, NodeConfig, RicosExtension } from 'ricos-tiptap-types';
import { Image as Component } from './component';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Toggle a paragraph
       */
      setImageUrl: (url: string) => ReturnType;
      /**
       * Update Image's loading state
       */
      setImageLoading: (isLoading: boolean) => ReturnType;
    };
  }
}

const name = TIPTAP_IMAGE_TYPE;

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
        atom: false,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...imageDataDefaults,
          loading: {
            default: false,
          },
          loadingPercentage: {
            default: null,
          },
        }),
        addCommands() {
          return {
            setImageUrl:
              url =>
              ({ commands }) => {
                return commands.updateAttributes(name, { image: { src: { custom: url } } });
              },
            setImageLoading:
              loading =>
              ({ commands }) => {
                return commands.updateAttributes(name, { loading });
              },
          };
        },
      };
    },
  },
];
