import type { TextDirection } from 'wix-rich-content-common';
import { isTextDirection } from 'wix-rich-content-common';
import type { RicosExtension } from 'ricos-tiptap-types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textDirection: {
      /**
       * Set a link mark
       */
      setTextDirection: (dir: TextDirection) => ReturnType;
      /**
       * Unset a link mark
       */
      unsetTextDirection: () => ReturnType;
    };
  }
}

export const createTextDirection = (): RicosExtension => ({
  type: 'extension' as const,
  createExtensionConfig: () => ({
    name: 'textDirection',
    addOptions: () => ({
      types: ['heading', 'paragraph'],
      directions: ['ltr', 'rtl', 'auto'],
      defaultDirection: 'auto',
    }),
    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            dir: {
              default: this.options.defaultDirection,
              parseHTML: element => ({
                dir: element.dir || this.options.defaultDirection,
              }),
              renderHTML: attributes => ({ dir: attributes.dir }),
            },
          },
        },
      ];
    },
    addCommands() {
      return {
        setTextDirection:
          direction =>
          ({ commands }) => {
            if (!isTextDirection(direction)) {
              return false;
            }
            return this.options.types.every(type =>
              commands.updateAttributes(type, { dir: direction })
            );
          },
        unsetTextDirection:
          () =>
          ({ commands }) => {
            return this.options.types.every(type => commands.resetAttributes(type, 'dir'));
          },
      };
    },
  }),
});
