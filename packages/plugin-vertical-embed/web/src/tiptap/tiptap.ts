import appEmbedDataDefaults from 'ricos-schema/dist/statics/app_embed.defaults.json';
import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { AppEmbed } from './component';
import { TIPTAP_APP_EMBED_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

export const createTiptapExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component: decorateComponentWithProps(AppEmbed, { settings }) as ComponentType<PluginProps>,
    name: TIPTAP_APP_EMBED_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => appEmbedDataDefaults,
        addOptions: () => settings,
      };
    },
  },
];
