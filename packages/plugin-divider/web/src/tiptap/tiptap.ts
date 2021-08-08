import { Divider as Component } from './component';

export const tiptapExtensions = [
  {
    type: 'node' as const,
    Component,
    createComponentDataDefaults: ({ DividerData }) => DividerData.fromJSON({}),
    createConfig: () => ({
      name: 'divider',
    }),
  },
];
