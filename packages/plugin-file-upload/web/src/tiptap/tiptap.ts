import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { File as Component } from './component';
import fileDataDefaults from 'ricos-schema/dist/statics/file.defaults.json';
import { TIPTAP_FILE_TYPE, generateId } from 'ricos-content';
import { uploadFile } from 'wix-rich-content-plugin-commons';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    file: {
      /**
       * Add file
       */
      addFile: (files: File[]) => void;
    };
  }
}

const name = TIPTAP_FILE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = ({
  uploadFunction,
  onError,
  ...defaultOptions
}) => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: {
      ...fileDataDefaults,
      loading: {
        default: false,
      },
      id: '',
    },
    createExtensionConfig: () => ({
      name,
      defaultOptions,
      addCommands() {
        return {
          addFile: files => ({ editor }) => {
            const id = generateId();
            const onSuccess = ({ name, type, url, size }) => {
              editor.commands.updateNodeAttrsById(id, {
                ...fileDataDefaults,
                src: { url },
                loading: false,
                name,
                type,
                size,
              });
            };

            editor.commands.insertNode(TIPTAP_FILE_TYPE, {
              id,
              ...fileDataDefaults,
              loading: true,
            });

            files.forEach(file => {
              uploadFile({
                file,
                uploadFunction,
                onError,
                onSuccess,
                onFileResolve: () => {},
              });
            });
          },
        };
      },
    }),
  },
];
