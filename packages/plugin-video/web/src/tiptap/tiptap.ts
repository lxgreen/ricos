import { CreateRicosExtensions, TIPTAP_VIDEO_TYPE } from 'wix-tiptap-editor';
import { Video as Component } from './component';
import { VideoData } from 'ricos-schema';

const name = TIPTAP_VIDEO_TYPE;

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
