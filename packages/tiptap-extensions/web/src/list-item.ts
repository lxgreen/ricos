import { mergeAttributes } from '@tiptap/core';
import { RicosExtension, DOMOutputSpec } from 'ricos-tiptap-types';

export const createListItem = (): RicosExtension => ({
  type: 'node' as const,
  createExtensionConfig: () => ({
    name: 'listItem',

    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },

    // Note: this should remain paragraph until draft-js is supported
    content: 'paragraph',

    defining: true,

    parseHTML() {
      return [
        {
          tag: 'li',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        'li',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ] as DOMOutputSpec;
    },

    addKeyboardShortcuts() {
      return {
        Enter: () => this.editor.commands.splitListItem(this.name),
        Tab: () => this.editor.commands.sinkListItem(this.name),
        'Shift-Tab': () => this.editor.commands.liftListItem(this.name),
      };
    },
  }),
});
