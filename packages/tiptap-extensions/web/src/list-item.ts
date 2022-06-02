import { mergeAttributes } from '@tiptap/core';
import { Node_Type } from 'ricos-schema';
import type { DOMOutputSpec, RicosExtension } from 'ricos-tiptap-types';

export const listItem: RicosExtension = {
  type: 'node' as const,
  groups: ['shortcuts-enabled'],
  name: Node_Type.LIST_ITEM,
  createExtensionConfig() {
    return {
      name: this.name,
      addOptions() {
        return {
          HTMLAttributes: {},
        };
      },

      // Note: this should remain paragraph until draft-js is supported
      // Note: these types could remain hard-coded since all of them always available
      content: `(${Node_Type.PARAGRAPH}|${Node_Type.BULLETED_LIST}|${Node_Type.ORDERED_LIST})+`,

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
        };
      },
    };
  },
};
