import { OrderedSet } from 'immutable';
import colorDataDefaults from 'ricos-schema/dist/statics/color.defaults.json';
import type { ExtensionProps, NodeConfig, RicosExtension } from 'ricos-tiptap-types';
import type { Color } from './types';

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

export const tiptapExtensions = [
  {
    type: 'mark',
    name: 'color',
    groups: [],
    reconfigure: (
      config: NodeConfig,
      _extensions: RicosExtension[],
      _props: ExtensionProps,
      settings: Record<string, unknown>
    ) => ({
      ...config,
      addOptions() {
        return {
          HTMLAttributes: {},
          ...settings,
        };
      },
    }),
    createExtensionConfig() {
      return {
        name: this.name,

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
          const shouldParseColor = (color: Color) => this.options.styleSelectionPredicate?.(color);

          const parseColor = (color: Color) =>
            this.options.customStyleFn?.(OrderedSet([color]))?.color;

          const getColor = (color: Color) => (shouldParseColor(color) ? parseColor(color) : color);
          return [
            'span',
            {
              style: `color: ${getColor(HTMLAttributes.foreground)}; background-color: ${getColor(
                HTMLAttributes.background
              )}`,
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
