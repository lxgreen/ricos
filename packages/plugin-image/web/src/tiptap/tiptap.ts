import imageDataDefaults from 'ricos-schema/dist/statics/image.defaults.json';
import { CreateRicosExtensions } from 'wix-tiptap-editor';
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

const name = 'image';

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: {
      ...imageDataDefaults,
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
        return {
          setImageUrl: url => ({ commands }) => {
            return commands.updateAttributes(name, { image: { src: { custom: url } } });
          },
          setImageLoading: isLoading => ({ commands }) => {
            return commands.updateAttributes(name, { myLoading: isLoading });
          },
        };
      },
    }),
  },
];
