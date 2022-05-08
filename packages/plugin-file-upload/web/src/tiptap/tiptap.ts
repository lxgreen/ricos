import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { File } from './component';
import fileDataDefaults from 'ricos-schema/dist/statics/file.defaults.json';
import { TIPTAP_FILE_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

const name = TIPTAP_FILE_TYPE;

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    groups: ['react'],
    name,
    Component: decorateComponentWithProps(File, { settings }) as ComponentType<PluginProps>,
    createExtensionConfig() {
      return {
        name: this.name,
        group: 'block',
        selectable: true,
        draggable: true,
        addAttributes: () => ({
          ...fileDataDefaults,
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
