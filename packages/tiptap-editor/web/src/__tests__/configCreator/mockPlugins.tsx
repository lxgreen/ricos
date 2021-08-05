import React from 'react';
import { EditorPlugin } from 'wix-rich-content-common';
import { ImageComponent } from 'wix-rich-content-plugin-image';

/**
 * 4 mock plugins with `tiptapExtensions` attribute.
 * Items: [Node, Mark, Generic, Error]
 */
export const mockPlugins: EditorPlugin[] = [
  {
    tiptapExtensions: [
      {
        type: 'node',
        createConfig: () => ({
          name: 'test1',
          dummy: true,
          priority: 200,
        }),
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
        createConfig: () => ({
          name: 'test3',
          addNodeViewHOC: () => ({
            nodeTypes: ['test1'],
            nodeViewHOC: Component => {
              // should use the new api containerData
              return props => {
                return (
                  <div>
                    <Component {...props} />
                  </div>
                );
              };
            },
          }),
        }),
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
