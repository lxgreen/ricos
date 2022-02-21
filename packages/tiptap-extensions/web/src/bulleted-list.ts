import { wrappingInputRule } from '@tiptap/core';
import type { RicosExtension } from 'ricos-tiptap-types';
import type { DOMOutputSpec } from 'prosemirror-model';

export interface BulletListOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bulletList: {
      /**
       * Toggle a bullet list
       */
      toggleBulletList: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*([-+*])\s$/;

export const createBulletedList = (): RicosExtension => ({
  type: 'node' as const,
  groups: [],
  createExtensionConfig: ({ mergeAttributes }) => ({
    name: 'bulletedList',

    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },

    group: 'block list',

    content() {
      return `${this.options.itemTypeName}+`;
    },

    parseHTML() {
      return [{ tag: 'ul' }];
    },

    renderHTML({ HTMLAttributes }) {
      return [
        'ul',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
        0,
      ] as DOMOutputSpec;
    },

    addCommands() {
      return {
        toggleBulletList:
          () =>
          ({ commands }) => {
            return commands.toggleList(this.name, 'listItem');
          },
      };
    },

    addKeyboardShortcuts() {
      return {
        'Mod-Shift-8': () => this.editor.commands.toggleBulletList(),
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
  }),
});
