import appEmbedDataDefaults from 'ricos-schema/dist/statics/app_embed.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { AppEmbed as Component } from './component';
import { TIPTAP_APP_EMBED_TYPE } from 'ricos-content';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component,
    name: TIPTAP_APP_EMBED_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => appEmbedDataDefaults,
        addOptions: () => defaultOptions,
      };
    },
  },
];
