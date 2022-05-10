import type { ExtensionProps, RicosExtension } from 'ricos-tiptap-types';
import { Decoration, DecorationSet } from 'prosemirror-view';
import { Plugin, PluginKey } from 'prosemirror-state';
import type { ExtensionConfig } from '@tiptap/core';

export const createPlaceholder = (defaultOptions): RicosExtension => ({
  type: 'extension' as const,
  groups: [],
  name: 'placeholder',
  reconfigure: (
    config: ExtensionConfig,
    _extensions: RicosExtension[],
    ricosProps: ExtensionProps
  ) => ({
    ...config,
    addOptions() {
      return {
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        placeholder: ricosProps.placeholder || '',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        includeChildren: false,
        ...defaultOptions,
      };
    },
  }),
  createExtensionConfig() {
    return {
      name: this.name,
      addProseMirrorPlugins() {
        return [
          new Plugin({
            key: new PluginKey('placeholder'),
            props: {
              decorations: ({ doc, selection }) => {
                const active = this.editor.isEditable || !this.options.showOnlyWhenEditable;
                const { anchor } = selection;
                const decorations: Decoration[] = [];

                if (!active) {
                  return;
                }

                doc.descendants((node, pos) => {
                  const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
                  const isEmpty = !node.isLeaf && !node.childCount;

                  if ((hasAnchor || !this.options.showOnlyCurrent) && isEmpty) {
                    const classes = [this.options.emptyNodeClass];

                    // TODO: this.editor.isEmpty returns false for our empty content (checks nodes === 0)
                    if (
                      this.editor.getText() === '' &&
                      this.editor.getJSON().content.length === 1
                    ) {
                      classes.push(this.options.emptyEditorClass);
                    }

                    const decoration = Decoration.node(pos, pos + node.nodeSize, {
                      class: classes.join(' '),
                      'data-placeholder':
                        typeof this.options.placeholder === 'function'
                          ? this.options.placeholder({
                              editor: this.editor,
                              node,
                              pos,
                            })
                          : this.options.placeholder,
                    });

                    decorations.push(decoration);
                  }

                  return this.options.includeChildren;
                });

                return DecorationSet.create(doc, decorations);
              },
            },
          }),
        ];
      },
    };
  },
});
