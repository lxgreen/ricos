import type { RicosExtension, RicosExtensionConfig } from 'ricos-tiptap-types';
import type { Transaction } from 'prosemirror-state';
import { TextSelection, AllSelection } from 'prosemirror-state';
import type { Command } from '@tiptap/core';
import { isTextSelection } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indentation: {
      /**
       * Increase text indent
       */
      indent: () => ReturnType;
      /**
       * Decrease text indent
       */
      outdent: () => ReturnType;
    };
  }
}

const INDENT_SIZE = 24;

export const createIndent = (): RicosExtension => ({
  type: 'extension' as const,
  groups: [],
  name: 'indent',
  reconfigure(config: RicosExtensionConfig, extensions: RicosExtension[]) {
    const types = extensions
      .filter(extension => extension.groups.includes('text-container'))
      .map(({ name }) => name);
    const minLevel = 0;
    const maxLevel = 4;
    return {
      ...config,
      addGlobalAttributes() {
        return [
          {
            types,
            attributes: {
              indentation: {
                renderHTML: attributes => {
                  if (attributes.indentation === 0) {
                    return {};
                  }

                  return {
                    style: `margin-left: ${attributes.indentation * INDENT_SIZE}px`,
                  };
                },
              },
            },
          },
        ];
      },
      addCommands() {
        const setNodeIndentMarkup = (tr: Transaction, pos: number, delta: number): Transaction => {
          const node = tr?.doc?.nodeAt(pos);

          if (node) {
            const nextLevel = (node.attrs.indentation || 0) + delta;
            const indent =
              nextLevel < minLevel ? minLevel : nextLevel > maxLevel ? maxLevel : nextLevel;

            if (indent !== node.attrs.indentation) {
              const { indentation: oldIndent, ...currentAttrs } = node.attrs;
              const nodeAttrs =
                indent > minLevel ? { ...currentAttrs, indentation: indent } : currentAttrs;
              return tr.setNodeMarkup(pos, node.type, nodeAttrs, node.marks);
            }
          }
          return tr;
        };

        const updateIndentationLevel = (tr: Transaction, delta: number): Transaction => {
          const { doc, selection } = tr;

          if (
            doc &&
            selection &&
            (isTextSelection(selection) || selection instanceof AllSelection)
          ) {
            const { from, to } = selection;
            doc.nodesBetween(from, to, (node, pos) => {
              if (types.includes(node.type.name)) {
                tr = setNodeIndentMarkup(tr, pos, delta);
                return false;
              }

              return true;
            });
          }

          return tr;
        };
        const applyIndentation: (direction: number) => () => Command =
          direction =>
          () =>
          ({ tr, state, dispatch }) => {
            const { selection } = state;
            tr = tr.setSelection(selection);
            tr = updateIndentationLevel(tr, direction);

            if (tr.docChanged) {
              dispatch?.(tr);
              return true;
            }

            return false;
          };

        return {
          indent: applyIndentation(1),
          outdent: applyIndentation(-1),
        };
      },
    };
  },
  createExtensionConfig() {
    return {
      name: this.name,

      addKeyboardShortcuts() {
        return {
          Tab: () => this.editor.commands.indent(),
          'Shift-Tab': () => this.editor.commands.outdent(),
        };
      },
    };
  },
});
