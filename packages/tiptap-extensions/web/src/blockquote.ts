import styles from './statics/styles.scss';
import { mergeAttributes, wrappingInputRule, findChildren } from '@tiptap/core';
import blockquoteDataDefaults from 'ricos-schema/dist/statics/blockquote.defaults.json';
import type { RicosExtension, DOMOutputSpec } from 'ricos-tiptap-types';
import type { Transaction } from 'prosemirror-state';
import { NodeSelection } from 'prosemirror-state';
import type { Node } from 'prosemirror-model';
import type { SingleCommands } from '@tiptap/core';
import { Node_Type } from 'ricos-schema';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    blockQuote: {
      /**
       * Set a blockquote node
       */
      setBlockquote: () => ReturnType;
      /**
       * Toggle a blockquote node
       */
      toggleBlockquote: () => ReturnType;
      /**
       * Unset a blockquote node
       */
      unsetBlockquote: () => ReturnType;
    };
  }
}

export const inputRegex = /^\s*>\s$/;

const name = Node_Type.BLOCKQUOTE;

const isBlockQuote = (node: Node): boolean => node.type.name === Node_Type.BLOCKQUOTE;

const getNodesInSelection = (doc: Node, from: number, to: number): Node[] => {
  const nodes: Node[] = [];
  doc.nodesBetween(from, to, node => {
    if ((node.isTextblock && node.textContent !== '') || isBlockQuote(node)) {
      nodes.push(node);
    }
  });
  return nodes;
};

const byId = (node: Node): ((node: Node) => boolean) => {
  const id = node.attrs.id;
  return node => node.attrs.id === id;
};

const getNodePosition = (node: Node, tr: Transaction): number => {
  const nodesWithPos = findChildren(tr.doc, byId(node));
  const { pos } = nodesWithPos[0];
  return pos;
};

const setSelectionToNode =
  (node: Node) =>
  ({ tr }: { tr: Transaction }) => {
    const pos = getNodePosition(node, tr);
    const newSelection = NodeSelection.create(tr.doc, pos);
    tr.setSelection(newSelection);
  };

const toggleBlockquote =
  (referenceNode: Node) =>
  ({ commands }: { commands: SingleCommands }) => {
    const commandName = isBlockQuote(referenceNode) ? 'lift' : 'wrapIn';
    return commands[commandName](name);
  };

export const blockquote: RicosExtension = {
  type: 'node' as const,
  groups: [],
  name,
  createExtensionConfig() {
    return {
      name: this.name,
      addOptions() {
        return {
          HTMLAttributes: {
            class: styles.quote,
          },
        };
      },

      // Note: this should be changed to 'block+' once the draft-js support is dropped
      content: Node_Type.PARAGRAPH,

      group: 'block',

      defining: true,

      parseHTML() {
        return [{ tag: 'blockquote' }];
      },

      addAttributes() {
        return blockquoteDataDefaults;
      },

      renderHTML({ HTMLAttributes }) {
        return [
          'blockquote',
          mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
          0,
        ] as DOMOutputSpec;
      },

      addCommands() {
        return {
          setBlockquote:
            () =>
            ({ commands }) => {
              return commands.wrapIn(this.name);
            },
          toggleBlockquote:
            () =>
            ({ editor, chain }) => {
              const {
                state: {
                  doc,
                  selection: { from, to },
                },
              } = editor;

              const nodes: Node[] = getNodesInSelection(doc, from, to);
              if (nodes.length === 0) return false;

              nodes
                .reduce((chain, node) => {
                  return chain
                    .command(setSelectionToNode(node))
                    .command(toggleBlockquote(nodes[0]));
                }, chain().focus())
                .run();
              return true;
            },
          unsetBlockquote:
            () =>
            ({ commands }) => {
              return commands.lift(this.name);
            },
        };
      },

      addKeyboardShortcuts() {
        return {
          'Mod-Shift-b': () => this.editor.commands.toggleBlockquote(),
        };
      },

      addInputRules() {
        return [
          wrappingInputRule({
            find: inputRegex,
            type: this.type,
          }),
        ];
      },
    };
  },
};
