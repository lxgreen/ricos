import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { Video } from './component';
import videoDataDefaults from 'ricos-schema/dist/statics/video.defaults.json';
import { TIPTAP_VIDEO_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

const name = TIPTAP_VIDEO_TYPE;

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    groups: ['react', 'spoilerable'],
    name,
    Component: decorateComponentWithProps(Video, { settings }) as ComponentType<PluginProps>,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...videoDataDefaults,
          loading: {
            default: false,
          },
          loadingPercentage: {
            default: null,
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
