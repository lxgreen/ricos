import imageDataDefaults from 'ricos-schema/dist/statics/image.defaults.json';
import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Image as Component } from './component';
import { Plugin, PluginKey } from 'prosemirror-state';
import { uploadFile } from 'wix-rich-content-plugin-commons';
import { generateId, TIPTAP_IMAGE_TYPE } from 'ricos-content';

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
      addImage: (files: File[]) => void;
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
      loading: {
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
          addImage: files => ({ editor }) => {
            const onSuccess = (data, id) => {
              editor.commands.updateNodeAttrsById(id, {
                image: {
                  src: { id: data.file_name },
                  width: data.width,
                  height: data.height,
                },
                loading: false,
              });
            };

            const onFileResolve = (url, id) => {
              editor.commands.insertNode(TIPTAP_IMAGE_TYPE, {
                id,
                image: { src: { url } },
                loading: true,
              });
            };
            files.forEach(file => {
              const id = generateId();
              uploadFile({
                file,
                uploadFunction,
                onError,
                onSuccess: data => onSuccess(data, id),
                onFileResolve: url => onFileResolve(url, id),
              });
            });
          },
          setImage: (url, width, height) => ({ commands }) => {
            return commands.updateAttributes(name, { image: { src: { id: url }, width, height } });
          },
          setImageLoading: loading => ({ commands }) => {
            return commands.updateAttributes(name, { loading });
          },
        };
      },
    }),
  },
];
