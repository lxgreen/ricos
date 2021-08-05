import { EditorPlugin } from 'wix-rich-content-common';
import { ImageComponent } from 'wix-rich-content-plugin-image';

export const mockPlugins: EditorPlugin[] = [
  {
    tiptapExtensions: [
      {
        type: 'node',
        createConfig: () => ({ name: 'test1', dummy: true }),
        createComponentDataDefaults: ({ ImageData }) => ImageData.fromJSON({}),
        Component: ImageComponent,
      },
    ],
    config: {},
    type: 'aaa',
  },
  {
    tiptapExtensions: [
      {
        type: 'mark',
        createConfig: () => ({ name: 'test2' }),
      },
    ],
    config: {},
    type: 'bbb',
  },
  {
    tiptapExtensions: [
      {
        type: 'extension',
        createConfig: () => ({ name: 'test3' }),
      },
    ],
    config: {},
    type: 'ccc',
  },
  {
    tiptapExtensions: [
      {
        type: 'blabla' as 'node',
        createConfig: () => ({ name: 'test4' }),
      },
    ],
    config: {},
    type: 'ddd',
  },
];
