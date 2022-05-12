import type { ComponentType } from 'react';
import { TIPTAP_APP_EMBED_TYPE } from 'ricos-content';
import appEmbedDataDefaults from 'ricos-schema/dist/statics/app_embed.defaults.json';
import type { ExtensionProps, NodeConfig, PluginProps, RicosExtension } from 'ricos-tiptap-types';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';
import { AppEmbed } from './component';

export const tiptapExtensions = [
  {
    type: 'node' as const,
    groups: ['react'],
    reconfigure: (
      config: NodeConfig,
      _extensions: RicosExtension[],
      _props: ExtensionProps,
      settings: Record<string, unknown>
    ) => ({
      ...config,
      Component: decorateComponentWithProps(AppEmbed, { settings }) as ComponentType<PluginProps>,
      addOptions: () => settings,
    }),

    name: TIPTAP_APP_EMBED_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => appEmbedDataDefaults,
      };
    },
  },
];
