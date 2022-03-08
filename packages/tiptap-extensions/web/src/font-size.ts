import type { RicosMarkExtension } from 'ricos-tiptap-types';
import fontSizeDataDefaults from 'ricos-schema/dist/statics/font_size.defaults.json';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    fontSize: {
      /**
       * Set a font mark
       */
      setFontSize: (size: number) => ReturnType;
    };
  }
}

export const createFontSize = (): RicosMarkExtension => ({
  type: 'mark' as const,
  groups: [],
  createExtensionConfig: ({ mergeAttributes }) => ({
    name: 'fontSize',

    addAttributes() {
      return fontSizeDataDefaults;
    },

    renderHTML({ HTMLAttributes }) {
      const htmlAttrs = {
        style: `font-size: ${HTMLAttributes.value}${HTMLAttributes.unit.toLowerCase()}`,
      };
      return ['span', mergeAttributes(htmlAttrs), 0];
    },
    addCommands() {
      return {
        setFontSize:
          (size: number) =>
          ({ commands }) => {
            if (!Number.isInteger(size) || size <= 0 || size > 900) {
              return false;
            }

            return commands.setMark(this.name, {
              value: size,
              unit: 'PX',
            });
          },
      };
    },
  }),
});
