import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Gallery as Component } from './component';
import galleryDataDefaults from 'ricos-schema/dist/statics/gallery.defaults.json';
import { TIPTAP_GALLERY_TYPE, generateId } from 'ricos-content';
import { uploadFile } from 'wix-rich-content-plugin-commons';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gallery: {
      /**
       * Add gallery
       */
      addGallery: (files: File[]) => void;
    };
  }
}

const name = TIPTAP_GALLERY_TYPE;

export const createRicosExtensions: CreateRicosExtensions = ({
  uploadFunction,
  onError,
  ...defaultOptions
}) => [
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
      defaultOptions,
      addCommands() {
        return {
          addGallery: files => ({ editor }) => {
            // TODO: shold fix gallery.defaults.json to this defaults
            const galleryDefault = {
              options: {
                layout: {
                  type: 'GRID',
                  orientation: 'COLUMNS',
                  horizontalScroll: false,
                  numberOfColumns: 3,
                },
                item: {
                  crop: 'FILL',
                  ratio: 1,
                },
                thumbnails: {
                  placement: 'TOP',
                },
              },
              items: [],
            };

            const items: Record<string, unknown>[] = [];
            const onSuccess = (data, index) => {
              items.push({
                image: {
                  media: {
                    src: { url: data.file_name },
                    width: data.width,
                    height: data.height,
                  },
                },
              });
              if (index === files.length - 1) {
                editor.commands.updateNodeAttrsById(id, {
                  ...galleryDefault,
                  items,
                  myLoading: false,
                });
              }
            };

            const id = generateId();
            editor.commands.insertNode(TIPTAP_GALLERY_TYPE, {
              id,
              ...galleryDefault,
              myLoading: true,
            });

            files.forEach((file, index) => {
              uploadFile({
                file,
                uploadFunction,
                onError,
                onSuccess: data => onSuccess(data, index),
                onFileResolve: () => {},
              });
            });
          },
        };
      },
    }),
  },
];
