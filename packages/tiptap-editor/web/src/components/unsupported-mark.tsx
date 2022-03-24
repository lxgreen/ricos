import type { MarkConfig } from '@tiptap/core';
import type { RicosMarkExtension } from 'ricos-tiptap-types';

export const getUnsupportedMarkConfig = ({
  type,
  ...attrs
}: {
  type: string;
  attrs: Record<string, unknown>;
}): RicosMarkExtension => ({
  type: 'mark' as const,
  groups: [],
  name: type,
  createExtensionConfig: (): MarkConfig => ({
    name: type,
    addAttributes: () => attrs,
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
          title: `'${type}' decoration is not supported by editor. Check editor configuration.`,
          style: 'cursor: help',
        },
        0,
      ];
    },
  }),
});
