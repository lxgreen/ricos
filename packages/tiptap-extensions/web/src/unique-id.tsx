import type { RicosExtension, RicosExtensionConfig } from 'ricos-tiptap-types';
import { Plugin, PluginKey } from 'prosemirror-state';
import { generateId } from 'ricos-content';

export const uniqueId: RicosExtension = {
  type: 'extension',
  groups: [],
  name: 'unique-id',
  reconfigure(config: RicosExtensionConfig, extensions: RicosExtension[]) {
    return {
      ...config,
      addGlobalAttributes() {
        return [
          {
            types: extensions
              .filter(extension => extension.type === 'node' && !extension.groups.includes('text'))
              .map(({ name }) => name),
            attributes: {
              id: {
                default: null,
              },
            },
          },
        ];
      },
    };
  },
  createExtensionConfig() {
    return {
      name: this.name,
      priority: 1,
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: new PluginKey('unique-id'),
            appendTransaction: (_transactions, oldState, newState) => {
              if (newState.doc === oldState.doc) {
                return;
              }
              const tr = newState.tr;
              const usedIds = {};

              newState.doc.descendants((node, pos) => {
                const nodeId = node.attrs.id;
                const id = nodeId && !usedIds[nodeId] ? nodeId : generateId();
                usedIds[id] = true;
                if (node.isBlock) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    id,
                  });
                }
              });

              return tr;
            },
          }),
        ];
      },
    };
  },
};
