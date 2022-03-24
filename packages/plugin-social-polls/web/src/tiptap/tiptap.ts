import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Poll as Component } from './component';
import pollDataDefaults from 'ricos-schema/dist/statics/poll.defaults.json';
import { TIPTAP_POLL_TYPE } from 'ricos-content';

const name = TIPTAP_POLL_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    name,
    groups: ['react'],
    Component,
    createExtensionConfig() {
      return {
        name: this.name,
        atom: false,
        group: 'block',
        addAttributes: () => ({
          ...pollDataDefaults,
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
