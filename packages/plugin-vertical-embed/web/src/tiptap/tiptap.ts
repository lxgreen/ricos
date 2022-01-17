import appEmbedDataDefaults from 'ricos-schema/dist/statics/app_embed.defaults.json';
import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import { AppEmbed as Component } from './component';
import { TIPTAP_APP_EMBED_TYPE } from 'ricos-content';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: appEmbedDataDefaults,
    createExtensionConfig: () => ({
      name: TIPTAP_APP_EMBED_TYPE,
      group: 'block',
      selectable: true,
      draggable: true,
      addOptions: () => defaultOptions,
    }),
  },
];
