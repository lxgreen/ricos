import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Video as Component } from './component';
import videoDataDefaults from 'ricos-schema/dist/statics/video.defaults.json';
import { TIPTAP_VIDEO_TYPE } from 'ricos-content';

const name = TIPTAP_VIDEO_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: {
      ...videoDataDefaults,
      id: '',
      myLoading: {
        default: false,
      },
    },
    createExtensionConfig: () => ({
      name,
      defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
