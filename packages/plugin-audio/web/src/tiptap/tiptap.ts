import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Audio as Component } from './component';
import audioDataDefaults from 'ricos-schema/dist/statics/audio.defaults.json';
import { TIPTAP_AUDIO_TYPE } from 'ricos-content';

const name = TIPTAP_AUDIO_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    name,
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...audioDataDefaults,
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
