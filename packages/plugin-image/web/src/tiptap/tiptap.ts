import imageDataDefaults from 'ricos-schema/dist/statics/image.defaults.json';
import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Image } from './component';
import { TIPTAP_IMAGE_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

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

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    name,
    groups: ['react', 'spoilerable'],
    Component: decorateComponentWithProps(Image, { settings }) as ComponentType<PluginProps>,
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
        addOptions: () => settings,
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
