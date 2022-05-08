import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Gif } from './component';
import gifDataDefaults from 'ricos-schema/dist/statics/gif.defaults.json';
import { TIPTAP_GIF_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

const name = TIPTAP_GIF_TYPE;

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    name,
    groups: ['react'],
    Component: decorateComponentWithProps(Gif, { settings }) as ComponentType<PluginProps>,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => gifDataDefaults,
        addOptions: () => settings,
        addCommands() {
          return {};
        },
      };
    },
  },
];
