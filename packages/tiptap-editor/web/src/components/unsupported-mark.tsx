import type { MarkConfig } from '@tiptap/core';
import type { RicosMarkExtension } from 'ricos-tiptap-types';

export const getUnsupportedMarkConfig = ({
  unsupportedMarkType,
  ...attrs
}: {
  unsupportedMarkType: string;
  attrs: Record<string, unknown>;
}): RicosMarkExtension => ({
  type: 'mark' as const,
  groups: [],
  name: unsupportedMarkType,
  createExtensionConfig: (): MarkConfig => ({
    name: unsupportedMarkType,
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
          title: `'${unsupportedMarkType}' decoration is not supported by editor. Check editor configuration.`,
          style: 'cursor: help',
        },
        0,
      ];
    },
  }),
});
