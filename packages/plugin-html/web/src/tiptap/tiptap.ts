import htmlDataDefaults from 'ricos-schema/dist/statics/html.defaults.json';
import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Html } from './component';
import { TIPTAP_HTML_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    name: TIPTAP_HTML_TYPE,
    groups: ['react'],
    Component: decorateComponentWithProps(Html, { settings }) as ComponentType<PluginProps>,
    createExtensionConfig() {
      return {
        name: this.name,
        atom: false,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => htmlDataDefaults,
        addOptions: () => settings,
      };
    },
  },
];
