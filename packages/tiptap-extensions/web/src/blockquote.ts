import styles from './statics/styles.scss';
import { mergeAttributes, wrappingInputRule } from '@tiptap/core';
import blockquoteDataDefaults from 'ricos-schema/dist/statics/blockquote.defaults.json';
import type { RicosExtension, DOMOutputSpec } from 'ricos-tiptap-types';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    blockQuote: {
      /**
       * Set a blockquote node
       */
      setBlockquote: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*>\s$/;

export const createBlockquote = (): RicosExtension => ({
  type: 'node' as const,
  groups: [],
  name: 'blockquote',
  createExtensionConfig() {
    return {
      name: this.name,
      addOptions() {
        return {
          HTMLAttributes: {
            class: styles.quote,
          },
        };
      },

      // Note: this should be changed to 'block+' once the draft-js support is dropped
      content: 'paragraph',

      group: 'block',

      defining: true,

      parseHTML() {
        return [{ tag: 'blockquote' }];
      },

      addAttributes() {
        return blockquoteDataDefaults;
      },

      renderHTML({ HTMLAttributes }) {
        return [
          'blockquote',
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ] as DOMOutputSpec;
      },

      addCommands() {
        return {
          setBlockquote:
            () =>
            ({ commands }) => {
              return commands.wrapIn(this.name);
            },
          toggleBlockquote:
            () =>
            ({ commands }) => {
              return commands.toggleWrap(this.name);
            },
          unsetBlockquote:
            () =>
            ({ commands }) => {
              return commands.lift(this.name);
            },
        };
      },

      addKeyboardShortcuts() {
        return {
          'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
        };
      },

      addInputRules() {
        return [
          wrappingInputRule({
            find: inputRegex,
            type: this.type,
          }),
        ];
      },
    };
  },
});
