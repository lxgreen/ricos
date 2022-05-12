import type { RicosExtension } from 'ricos-tiptap-types';
export const doc: RicosExtension = {
  type: 'node' as const,
  groups: [],
  name: 'doc',
  createExtensionConfig() {
    return {
      name: this.name,
      topNode: true,
      content: 'block+',
      addAttributes: () => ({
        metadata: {},
      }),
    };
  },
};
