import { createRicosNodeConfig } from '../../extensions-creators/node';
import Image from './image';
import { ImageData } from 'ricos-schema';

const componentDataDefaults = ImageData.fromJSON({});
const name = 'image';
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    image: {
      /**
       * Toggle a paragraph
       */
      setImageUrl: () => ReturnType;
    };
  }
}

export const createImageConfig = () =>
  createRicosNodeConfig(Image, ({ mergeAttributes }) => {
    return {
      name,
      group: 'block',

      atom: false,
      selectable: true,
      draggable: true,

      addAttributes() {
        return {
          myLoading: {
            default: false,
          },
          ...componentDataDefaults,
        };
      },
      addCommands() {
        return {
          setImageUrl: url => ({ commands }) => {
            return commands.updateAttributes(name, { image: { src: { custom: url } } });
          },
          setImageLoading: isLoading => ({ commands }) => {
            return commands.updateAttributes(name, { myLoading: isLoading });
          },
          insertImage: () => ({ commands }) => {
            return commands.insertContent({
              type: this.name,
              attrs: {
                myLoading: false,
                disableExpand: false,
                disableDownload: false,
                config: {
                  size: 'content',
                  alignment: 'center',
                  spoiler: {
                    enabled: false,
                    description: 'ffd',
                  },
                  link: null,
                },
                src: {
                  id: '8bb438_8583414cdf6544a191e2b8f678ce7b63.jpg',
                  file_name: '8bb438_8583414cdf6544a191e2b8f678ce7b63.jpg',
                },
                metadata: null,
              },
            });
          },
        };
      },

      parseHTML() {
        return [
          {
            tag: `${name}-component`,
          },
        ];
      },

      renderHTML({ HTMLAttributes }) {
        return [`${name}-component`, mergeAttributes(HTMLAttributes)];
      },
    };
  });
// addNodeViewHOC() {
//   return ImageComponent => {
//     return props => {
//       return (
//         <div style={{ border: '10px solid blue' }}>
//           <ImageComponent {...props} />
//         </div>
//       );
//     };
//   };
// },
