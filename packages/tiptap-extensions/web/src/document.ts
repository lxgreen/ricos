import type { RicosExtension } from 'ricos-tiptap-types';
export const createDoc = (): RicosExtension => ({
  type: 'node' as const,
  createExtensionConfig: () => ({
    name: 'doc',
    topNode: true,
    content: 'block+',
    addAttributes: () => ({
      metadata: {},
    }),
  }),
});
