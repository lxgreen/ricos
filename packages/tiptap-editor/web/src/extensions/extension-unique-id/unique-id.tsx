import { RicosFunctionalExtension } from '../../models/extension-types';
import { Plugin } from 'prosemirror-state';
import { generateId } from 'ricos-content';

const name = 'unique-id';

export const createUniqueId = (): RicosFunctionalExtension => ({
  type: 'extension',
  createExtensionConfig: () => {
    return {
      name,
      priority: 1,
      addGlobalAttributes() {
        return [
          {
            //TODO: take node extensions names from extensions config
            types: [
              'divider',
              'image',
              'gallery',
              'file',
              'gif',
              'video',
              'linkPreview',
              'paragraph',
              'bulletedList',
              'spoiler',
              'codeBlock',
              'heading',
              'blockquote',
              'orderedList',
              'listItem',
            ],
            attributes: {
              id: {
                default: null,
                rendered: false,
                keepOnSplit: false,
              },
            },
          },
        ];
      },
      addProseMirrorPlugins() {
        return [
          new Plugin({
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
});
