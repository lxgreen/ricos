import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { Poll as Component } from './component';
import pollDataDefaults from 'ricos-schema/dist/statics/poll.defaults.json';
import { TIPTAP_POLL_TYPE } from 'ricos-content';

const name = TIPTAP_POLL_TYPE;

export const createRicosExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component,
    componentDataDefaults: {
      ...pollDataDefaults,
      loading: {
        default: false,
      },
    },
    createExtensionConfig: () => ({
      name,
      atom: false,
      group: 'block',
      addOptions: () => defaultOptions,
      addCommands() {
        return {};
      },
    }),
  },
];
