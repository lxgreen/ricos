import dividerDataDefaults from 'ricos-schema/dist/statics/divider.defaults.json';
import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Divider } from './component';
import { TIPTAP_DIVIDER_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

export const createTiptapExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    groups: ['react'],
    Component: decorateComponentWithProps(Divider, { settings }) as ComponentType<PluginProps>,
    name: TIPTAP_DIVIDER_TYPE,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => dividerDataDefaults,
        addOptions: () => settings,
      };
    },
  },
];
