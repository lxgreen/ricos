import { Node, mergeAttributes, wrappingInputRule } from '@tiptap/core';

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

const BulletList = Node.create<BulletListOptions>({
  name: 'bulletedList',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
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
});

export const createBulletedList = () => BulletList;
