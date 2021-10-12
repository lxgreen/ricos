import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Video as Component } from './component';
import { VideoData } from 'ricos-schema';

const name = 'video';

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...VideoData.fromJSON({}), id: '' },
    createExtensionConfig: () => ({
      name,
      atom: false,
      defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
