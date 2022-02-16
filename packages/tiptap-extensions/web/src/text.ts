import type { RicosExtension } from 'ricos-tiptap-types';

export const createText = (): RicosExtension => ({
  type: 'node' as const,
  groups: ['text'],
  createExtensionConfig: () => ({
    name: 'text',
    group: 'inline',
  }),
});
