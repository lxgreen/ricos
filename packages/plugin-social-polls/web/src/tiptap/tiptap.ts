import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Poll } from './component';
import pollDataDefaults from 'ricos-schema/dist/statics/poll.defaults.json';
import { TIPTAP_POLL_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

const name = TIPTAP_POLL_TYPE;

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    name,
    groups: ['react'],
    Component: decorateComponentWithProps(Poll, { settings }) as ComponentType<PluginProps>,
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
        addOptions: () => settings,
        addCommands() {
          return {};
        },
      };
    },
  },
];
