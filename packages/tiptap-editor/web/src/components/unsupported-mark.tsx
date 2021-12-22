import { RicosMarkExtension } from 'ricos-tiptap-types';
import { MarkConfig } from '@tiptap/core';

export const getUnsupportedMarkConfig = (name: string): RicosMarkExtension => ({
  type: 'mark' as const,
  createExtensionConfig: (): MarkConfig => ({
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

    renderHTML() {
      return [
        'abbr',
        {
          title: `'${name}' decoration is not supported by editor. Check editor configuration.`,
          style: 'cursor: help',
        },
        0,
      ];
    },
  }),
});
