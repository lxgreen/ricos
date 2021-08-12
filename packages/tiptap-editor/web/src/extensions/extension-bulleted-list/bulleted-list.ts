import { Node, mergeAttributes } from '@tiptap/core';
import { wrappingInputRule } from 'prosemirror-inputrules';

export interface BulletedListOptions {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    bulletedList: {
      /**
       * Toggle a bullet list
       */
      toggleBulletList: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*([-+*])\s$/;

export const BulletedList = Node.create<BulletedListOptions>({
  name: 'bulletedList',

  defaultOptions: {
    HTMLAttributes: {},
  },

  group: 'block list',

  content: 'listItem+',

  parseHTML() {
    return [{ tag: 'ul' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['ul', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },

  addCommands() {
    return {
      toggleBulletList: () => ({ commands }) => {
        return commands.toggleList('bulletedList', 'listItem');
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      'Mod-Shift-8': () => this.editor.commands.toggleBulletList(),
    };
  },

  addInputRules() {
    return [wrappingInputRule(inputRegex, this.type)];
  },
});
