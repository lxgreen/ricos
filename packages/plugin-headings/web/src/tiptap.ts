import { CreateRicosExtensions, DOMOutputSpec } from 'ricos-tiptap-types';
import headingDataDefaults from 'ricos-schema/dist/statics/heading.defaults.json';

type Level = 1 | 2 | 3 | 4 | 5 | 6;

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    heading: {
      /**
       * Set a heading node
       */
      setHeading: (attributes: { level: Level }) => ReturnType;
      /**
       * Toggle a heading node
       */
      toggleHeading: (attributes: { level: Level }) => ReturnType;
    };
  }
}

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    createExtensionConfig: ({ mergeAttributes, textblockTypeInputRule }) => ({
      name: 'heading',

      addOptions() {
        return {
          levels: [1, 2, 3, 4, 5, 6],
          HTMLAttributes: {},
          ...defaultOptions,
        };
      },

      content: 'inline*',

      group: 'block',

      defining: true,

      addAttributes() {
        return headingDataDefaults;
      },

      parseHTML() {
        return this.options.levels.map((level: Level) => ({
          tag: `h${level}`,
          attrs: { level },
        }));
      },

      renderHTML({ node, HTMLAttributes }) {
        const hasLevel = this.options.levels.includes(node.attrs.level);
        const level = hasLevel ? node.attrs.level : this.options.levels[0];

        return [
          `h${level}`,
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ] as DOMOutputSpec;
      },

      addCommands() {
        return {
          setHeading: attributes => ({ commands }) => {
            if (!this.options.levels.includes(attributes.level)) {
              return false;
            }

            return commands.setNode(this.name, attributes);
          },
          toggleHeading: attributes => ({ commands }) => {
            if (!this.options.levels.includes(attributes.level)) {
              return false;
            }

            return commands.toggleNode(this.name, 'paragraph', attributes);
          },
        };
      },

      addKeyboardShortcuts() {
        return this.options.levels.reduce(
          (items, level) => ({
            ...items,
            ...{
              [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level }),
            },
          }),
          {}
        );
      },

      addInputRules() {
        return this.options.levels.map(level => {
          return textblockTypeInputRule({
            find: new RegExp(`^(#{1,${level}})\\s$`),
            type: this.type,
            getAttributes: {
              level,
            },
          });
        });
      },
    }),
  },
];
