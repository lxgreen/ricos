import { createRicosNodeExtensionConfig } from 'wix-rich-content-editor-common';
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

export const tiptapExtensions = [
  createRicosNodeExtensionConfig({
    Component,
    createComponentDataDefaults: ({ ImageData }) => ({
      ...ImageData.fromJSON({}),
      myLoading: {
        default: false,
      },
    }),
    createConfig: () => ({
      name,
      atom: false,
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
  }),
];
