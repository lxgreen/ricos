import type { RicosExtension } from 'ricos-tiptap-types';

export const createText = (): RicosExtension => ({
  type: 'node' as const,
  groups: ['text'],
  name: 'text',
  createExtensionConfig() {
    return {
      name: this.name,
      group: 'inline',
    };
  },
});
