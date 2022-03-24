import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Video as Component } from './component';
import videoDataDefaults from 'ricos-schema/dist/statics/video.defaults.json';
import { TIPTAP_VIDEO_TYPE } from 'ricos-content';

const name = TIPTAP_VIDEO_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react', 'spoilerable'],
    name,
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...videoDataDefaults,
          loading: {
            default: false,
          },
        }),
        addOptions: () => defaultOptions,
        addCommands() {
          return {};
        },
      };
    },
  },
];
