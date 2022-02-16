import { mergeAttributes, wrappingInputRule } from '@tiptap/core';
import type { RicosExtension, DOMOutputSpec } from 'ricos-tiptap-types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    orderedList: {
      /**
       * Toggle an ordered list
       */
      toggleOrderedList: () => ReturnType;
    };
  }
}

export const inputRegex = /^(\d+)\.\s$/;

export const createOrderedList = (): RicosExtension => ({
  type: 'node' as const,
  groups: [],
  createExtensionConfig: () => ({
    name: 'orderedList',

    addOptions() {
      return {
        itemTypeName: 'listItem',
        HTMLAttributes: {},
      };
    },

    group: 'block list',

    content() {
      return `${this.options.itemTypeName}+`;
    },

    addAttributes() {
      return {
        start: {
          default: 1,
          parseHTML: element => {
            return element.hasAttribute('start')
              ? parseInt(element.getAttribute('start') || '', 10)
              : 1;
          },
        },
      };
    },

    parseHTML() {
      return [
        {
          tag: 'ol',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      const { start, ...attributesWithoutStart } = HTMLAttributes;

      return (
        start === 1
          ? ['ol', mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0]
          : ['ol', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
      ) as DOMOutputSpec;
    },

    addCommands() {
      return {
        toggleOrderedList:
          () =>
          ({ commands }) => {
            return commands.toggleList(this.name, this.options.itemTypeName);
          },
      };
    },

    addKeyboardShortcuts() {
      return {
        'Mod-Shift-7': () => this.editor.commands.toggleOrderedList(),
      };
    },

    addInputRules() {
      return [
        wrappingInputRule({
          find: inputRegex,
          type: this.type,
          getAttributes: match => ({ start: Number(match[1]) }),
          joinPredicate: (match, node) => node.childCount + node.attrs.start === Number(match[1]),
        }),
      ];
    },
  }),
});
