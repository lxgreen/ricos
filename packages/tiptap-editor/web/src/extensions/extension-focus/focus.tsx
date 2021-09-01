import { pipe } from 'fp-ts/function';
import React, { useState, useEffect, ComponentType } from 'react';
import { Editor } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';
import { DecorationSet, Decoration } from 'prosemirror-view';

const name = 'focus';

const isInSelection = (selection: Editor['state']['selection']) => (position: number) =>
  position >= selection.$from.pos && position <= selection.$to.pos;

const useIsSelected = (editor: Editor, getPos: () => number) => {
  const [isSelected, setSelected] = useState(false);

  useEffect(() => {
    const onSelectionUpdate = ({ editor }) => {
      console.log({ editor });
      console.log(editor.view.state.selection);
      const selection = editor.view.state.selection;
      const doc = editor.view.state.doc;
      doc.nodesBetween(selection.from, selection.to, (node, pos) => {
        console.log({ node, pos });
      });
      return pipe(getPos(), isInSelection(editor.state.selection), setSelected);
    };

    editor.on('selectionUpdate', onSelectionUpdate);
    return () => {
      editor.off('selectionUpdate', onSelectionUpdate);
    };
  }, []);

  return isSelected;
};

export const createFocusConfig = defaultOptions => ({
  type: 'extension',
  createExtensionConfig: () => ({
    name,
    priority: 20,
    defaultOptions: defaultOptions || {
      className: 'yaron123',
    },
    addNodeViewHOC: () => ({
      nodeTypes: ['*'],
      nodeViewHOC: (Component: ComponentType) => props => {
        console.log({ props });
        return <Component {...props} isFocused={useIsSelected(props.editor, props.getPos)} />;
      },
    }),
    addProseMirrorPlugins() {
      return [
        new Plugin({
          key: new PluginKey('focus'),
          props: {
            decorations: ({ doc, selection }) => {
              const { isEditable, isFocused } = this.editor;
              const { anchor } = selection;
              const decorations: Decoration[] = [];

              if (!isEditable || !isFocused) {
                return DecorationSet.create(doc, []);
              }

              // Maximum Levels
              let maxLevels = 0;

              if (this.options.mode === 'deepest') {
                doc.descendants((node, pos) => {
                  if (node.isText) {
                    return;
                  }

                  const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;

                  if (!isCurrent) {
                    return false;
                  }

                  maxLevels += 1;
                });
              }

              // Loop through current
              let currentLevel = 0;

              doc.descendants((node, pos) => {
                if (node.isText) {
                  return false;
                }

                const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;

                if (!isCurrent) {
                  return false;
                }

                currentLevel += 1;

                const outOfScope =
                  (this.options.mode === 'deepest' && maxLevels - currentLevel > 0) ||
                  (this.options.mode === 'shallowest' && currentLevel > 1);

                if (outOfScope) {
                  return this.options.mode === 'deepest';
                }

                decorations.push(
                  Decoration.node(pos, pos + node.nodeSize, {
                    class: this.options.className,
                  })
                );
              });

              return DecorationSet.create(doc, decorations);
            },
          },
        }),
      ];
    },
  }),
});
