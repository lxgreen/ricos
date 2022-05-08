import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Audio } from './component';
import audioDataDefaults from 'ricos-schema/dist/statics/audio.defaults.json';
import { TIPTAP_AUDIO_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

const name = TIPTAP_AUDIO_TYPE;

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    groups: ['react'],
    name,
    Component: decorateComponentWithProps(Audio, { settings }) as ComponentType<PluginProps>,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...audioDataDefaults,
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
