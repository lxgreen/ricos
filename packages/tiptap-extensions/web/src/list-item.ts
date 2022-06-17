import { mergeAttributes } from '@tiptap/core';
import type { DOMOutputSpec, RicosExtension } from 'ricos-tiptap-types';
import type { Node } from 'prosemirror-model';
import { Node_Type } from 'ricos-schema';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    listItem: {
      /**
       * increase list indentation
       */
      indentList: () => ReturnType;
      /**
       * decrease list indentation
       */
      outdentList: () => ReturnType;
    };
  }
}

export const listItem: RicosExtension = {
  type: 'node' as const,
  groups: ['shortcuts-enabled'],
  name: Node_Type.LIST_ITEM,
  createExtensionConfig() {
    return {
      name: this.name,
      addOptions() {
        return {
          HTMLAttributes: {},
        };
      },

      // Note: this should remain paragraph until draft-js is supported
      // Note: these types could remain hard-coded since all of them always available
      content: `(${Node_Type.PARAGRAPH}|${Node_Type.BULLETED_LIST}|${Node_Type.ORDERED_LIST})+`,

      defining: true,

      parseHTML() {
        return [
          {
            tag: 'li',
          },
        ];
      },

      renderHTML({ HTMLAttributes }) {
        return [
          'li',
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ] as DOMOutputSpec;
      },

      addCommands() {
        return {
          indentList:
            () =>
            ({ state, chain }) => {
              let indentation = 0;
              state.doc.nodesBetween(state.selection.from, state.selection.to, (node: Node) => {
                if (
                  node.attrs.id &&
                  (node.type.name === Node_Type.ORDERED_LIST ||
                    node.type.name === Node_Type.BULLETED_LIST)
                ) {
                  indentation = node.attrs.indentation + 1;
                }
              });
              if (indentation <= 4) {
                return chain()
                  .sinkListItem(this.name)
                  .command(({ state, tr }) => {
                    state.doc.nodesBetween(
                      state.selection.from,
                      state.selection.to,
                      (node: Node, pos: number) => {
                        if (
                          !node.attrs.id &&
                          (node.type.name === Node_Type.ORDERED_LIST ||
                            node.type.name === Node_Type.BULLETED_LIST)
                        ) {
                          tr.setNodeMarkup(
                            pos,
                            node.type,
                            { ...node.attrs, indentation },
                            node.marks
                          );
                        }
                      }
                    );
                    return true;
                  })
                  .run();
              }
              return false;
            },
          outdentList:
            () =>
            ({ state, commands }) => {
              let indentation = 0;
              state.doc.nodesBetween(state.selection.from, state.selection.to, (node: Node) => {
                node.attrs.id &&
                  (node.type.name === Node_Type.ORDERED_LIST ||
                    node.type.name === Node_Type.BULLETED_LIST) &&
                  (indentation = node.attrs.indentation - 1);
              });
              if (indentation >= 0) {
                return commands.liftListItem(this.name);
              }
              return false;
            },
        };
      },

      addKeyboardShortcuts() {
        return {
          Enter: () => this.editor.commands.splitListItem(this.name),
        };
      },
    };
  },
};
