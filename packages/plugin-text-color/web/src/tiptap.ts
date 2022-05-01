import colorDataDefaults from 'ricos-schema/dist/statics/color.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';

export interface ColorOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    color: {
      /**
       * Set a color mark
       */
      setColor: (color: string) => ReturnType;
      /**
       * Unset a color mark
       */
      unsetColor: () => ReturnType;
      /**
       * Set a color mark
       */
      setHighlight: (color: string) => ReturnType;
      /**
       * Unset a color mark
       */
      unsetHighlight: () => ReturnType;
    };
  }
}

export const getTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'mark',
    name: 'color',
    groups: [],
    createExtensionConfig() {
      return {
        name: this.name,

        addOptions: () => ({
          HTMLAttributes: {},
          ...defaultOptions,
        }),
        addAttributes() {
          return colorDataDefaults;
        },
        parseHTML() {
          return [
            {
              tag: 'span',
              getAttrs: element => {
                const { color, backgroundColor } = (element as HTMLElement).style || {};
                return color || backgroundColor ? {} : false;
              },
            },
          ];
        },

        renderHTML({ HTMLAttributes }) {
          return [
            'span',
            {
              style: `color: ${HTMLAttributes.foreground}; background-color: ${HTMLAttributes.background}`,
            },
            0,
          ];
        },

        addCommands() {
          return {
            setColor:
              color =>
              ({ commands }) => {
                return commands.setMark('color', { foreground: color });
              },
            unsetColor:
              () =>
              ({ commands }) => {
                return commands.setMark('color', { foreground: null });
              },
            setHighlight:
              color =>
              ({ commands }) => {
                return commands.setMark('color', { background: color });
              },
            unsetHighlight:
              () =>
              ({ commands }) => {
                return commands.setMark('color', { background: null });
              },
          };
        },
      };
    },
  },
];
