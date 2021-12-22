import { RicosMarkExtension } from 'ricos-tiptap-types';
import { MarkConfig } from '@tiptap/core';

export const getUnsupportedMarkConfig = (name: string): RicosMarkExtension => ({
  type: 'mark' as const,
  createExtensionConfig: ({ mergeAttributes }): MarkConfig => ({
    name,
    addOptions: () => ({
      HTMLAttributes: {},
    }),

    parseHTML() {
      return [
        {
          tag: 'abbr',
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return ['abbr', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
    },
  }),
});
