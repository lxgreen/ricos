import { TIPTAP_FILE_TYPE } from 'ricos-content';
import fileDataDefaults from 'ricos-schema/dist/statics/file.defaults.json';
import type { ExtensionProps, NodeConfig, RicosExtension } from 'ricos-tiptap-types';
import { File as Component } from './component';

const name = TIPTAP_FILE_TYPE;

export const tiptapExtensions = [
  {
    type: 'node' as const,
    groups: ['react'],
    name,
    reconfigure: (
      config: NodeConfig,
      _extensions: RicosExtension[],
      _props: ExtensionProps,
      settings: Record<string, unknown>
    ) => ({
      ...config,
      addOptions: () => settings,
    }),
    Component,
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
        addCommands() {
          return {};
        },
      };
    },
  },
];
