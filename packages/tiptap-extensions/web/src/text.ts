import { RicosExtension } from 'ricos-tiptap-types';

export const createText = (): RicosExtension => ({
  type: 'node' as const,
  createExtensionConfig: () => ({
    name: 'text',
    group: 'inline',
  }),
});
