import { PluginKey, Plugin } from 'prosemirror-state';
import type { RicosExtension } from 'ricos-tiptap-types';

/**
 * Extension based on:
 * - https://github.com/ueberdosis/tiptap/blob/v1/packages/tiptap-extensions/src/extensions/TrailingNode.js
 * - https://github.com/remirror/remirror/blob/e0f1bec4a1e8073ce8f5500d62193e52321155b9/packages/prosemirror-trailing-node/src/trailing-node-plugin.ts
 */

export const createTrailingNode = (): RicosExtension => ({
  type: 'extension' as const,
  groups: [],
  name: 'trailingNode',
  createExtensionConfig() {
    return {
      name: this.name,
      defaultOptions: {
        node: 'paragraph',
        notAfter: ['paragraph'],
      },

      addProseMirrorPlugins() {
        const plugin = new PluginKey(this.name);
        return [
          new Plugin({
            key: plugin,
            appendTransaction: (_, __, state) => {
              const { doc, tr, schema } = state;
              const lastNode = state.tr.doc.lastChild;
              if (this.options.notAfter.includes(lastNode?.type.name)) {
                return;
              }
              const endPosition = doc.content.size;
              const type = schema.nodes[this.options.node];

              return tr.insert(endPosition, type.create());
            },
          }),
        ];
      },
    };
  },
});
