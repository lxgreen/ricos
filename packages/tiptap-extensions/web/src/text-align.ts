import type { RicosExtension } from 'ricos-tiptap-types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textAlign: {
      /**
       * Set the text align attribute
       */
      setTextAlign: (alignment: string) => ReturnType;
      unsetTextAlign: () => ReturnType;
    };
  }
}

export const createTextAlign = (): RicosExtension => ({
  type: 'extension' as const,
  createExtensionConfig: () => ({
    name: 'textAlign',

    addOptions() {
      return {
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      };
    },

    addGlobalAttributes() {
      return [
        {
          types: this.options.types,
          attributes: {
            textStyle: {
              parseHTML: element => element.style.textAlign,
              renderHTML: attributes => {
                if (attributes?.textStyle?.textAlignment) {
                  return {
                    style: `text-align: ${attributes.textStyle.textAlignment.toLowerCase()}`,
                  };
                }
                return {};
              },
            },
          },
        },
      ];
    },

    addCommands() {
      return {
        setTextAlign:
          (alignment: string) =>
          ({ commands }) => {
            if (!this.options.alignments.includes(alignment)) {
              return false;
            }

            return this.options.types.every(type =>
              commands.updateAttributes(type, {
                textStyle: { textAlignment: alignment.toUpperCase() },
              })
            );
          },
        unsetTextAlign: () => () => {
          console.error('unsetTextAlign : was not implemented');
          return false;
        },
      };
    },

    addKeyboardShortcuts() {
      return {
        'Mod-Shift-l': () => this.editor.commands.setTextAlign('left'),
        'Mod-Shift-e': () => this.editor.commands.setTextAlign('center'),
        'Mod-Shift-r': () => this.editor.commands.setTextAlign('right'),
        'Mod-Shift-j': () => this.editor.commands.setTextAlign('justify'),
      };
    },
  }),
});
