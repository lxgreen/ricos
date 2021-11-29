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
              'link',
              'paragraph',
              'bulletedList',
              'spoiler',
              'codeBlock',
              'heading',
              'blockquote',
              'orderedList',
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

              newState.doc.descendants((node, pos) => {
                if (node.isBlock && !node.attrs.id) {
                  tr.setNodeMarkup(pos, undefined, {
                    ...node.attrs,
                    id: generateId(),
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
