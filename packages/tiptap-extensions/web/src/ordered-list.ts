import { mergeAttributes, wrappingInputRule } from '@tiptap/core';
import { Node_Type } from 'ricos-schema';
import orderedListDataDefaults from 'ricos-schema/dist/statics/ordered_list.defaults.json';
import type { DOMOutputSpec, RicosExtension } from 'ricos-tiptap-types';
import styles from './statics/styles.scss';

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

export const orderedList: RicosExtension = {
  type: 'node' as const,
  groups: [],
  name: Node_Type.ORDERED_LIST,
  createExtensionConfig() {
    return {
      name: this.name,
      addOptions() {
        return {
          itemTypeName: Node_Type.LIST_ITEM,
          HTMLAttributes: { class: styles.orderedList },
        };
      },

      group: 'block list',

      content() {
        return `${this.options.itemTypeName}+`;
      },

      addAttributes() {
        return {
          ...orderedListDataDefaults,
          start: {
            default: 1,
            parseHTML: element => {
              return element.hasAttribute('start')
                ? parseInt(element.getAttribute('start') || '', 10)
                : 1;
            },
          },
          indentation: { default: 0 },
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
    };
  },
};
