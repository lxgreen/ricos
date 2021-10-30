import imageDataDefaults from 'ricos-schema/dist/statics/image.defaults.json';
import { CreateRicosExtensions, TIPTAP_IMAGE_TYPE } from 'wix-tiptap-editor';
import { Image as Component } from './component';
import { Plugin, PluginKey } from 'prosemirror-state';
import { uploadFile } from 'wix-rich-content-plugin-commons';
import { generateId } from 'ricos-content';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Toggle a paragraph
       */
      setImage: (url: string, width: number, height: number) => ReturnType;
      /**
       * Update Image's loading state
       */
      setImageLoading: (isLoading: boolean) => ReturnType;
      /**
       * Upload image
       */
      addImage: (file: File) => void;
    };
  }
}

const name = TIPTAP_IMAGE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = ({
  uploadFunction,
  onError,
  ...defaultOptions
}) => [
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
      addProseMirrorPlugins() {
        const plugins: Plugin[] = [];
        plugins.push(
          new Plugin({
            key: new PluginKey('handlePasteImage'),
            props: {
              handlePaste: (view, event) => {
                let hasFiles = false;
                Array.from(event?.clipboardData?.files || [])
                  .filter(item => item.type.startsWith('image'))
                  .forEach(item => {
                    this.editor.commands.addImage(item);
                    hasFiles = true;
                  });
                if (hasFiles) {
                  event.preventDefault();
                  return true;
                }
                return false;
              },
            },
          })
        );

        return plugins;
      },
      addCommands() {
        return {
          addImage: file => ({ editor }) => {
            const id = generateId();
            const onSuccess = data => {
              editor.commands.updateNodeAttrsById(id, {
                image: {
                  src: { id: data.file_name },
                  width: data.width,
                  height: data.height,
                },
                myLoading: false,
              });
            };

            const onFileResolve = url => {
              return editor.commands.insertNode(TIPTAP_IMAGE_TYPE, {
                id,
                image: { src: { url } },
                myLoading: true,
              });
            };
            uploadFile({ file, uploadFunction, onError, onSuccess, onFileResolve });
          },
          setImage: (url, width, height) => ({ commands }) => {
            return commands.updateAttributes(name, { image: { src: { id: url }, width, height } });
          },
          setImageLoading: isLoading => ({ commands }) => {
            return commands.updateAttributes(name, { myLoading: isLoading });
          },
        };
      },
    }),
  },
];
