import { mergeAttributes } from '@tiptap/core';
import type { Node as ProsemirrorNode } from 'prosemirror-model';
import paragraphDataDefaults from 'ricos-schema/dist/statics/paragraph.defaults.json';
import type { RicosExtension, DOMOutputSpec } from 'ricos-tiptap-types';

export interface ParagraphOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    paragraph: {
      /**
       * Toggle a paragraph
       */
      setParagraph: () => ReturnType;
    };
  }
}

const createStyleAttribute = (node: ProsemirrorNode) => {
  const attrLineHeight = node.attrs.textStyle?.lineHeight;
  const attrTextAlign = node.attrs.textStyle?.textAlignment;
  const textAlign =
    attrTextAlign && attrTextAlign !== 'AUTO' ? `text-align: ${attrTextAlign.toLowerCase()};` : '';
  const lineHeight = attrLineHeight ? `line-height: ${attrLineHeight};` : '';
  const style = textAlign.concat(lineHeight);
  return { style };
};

export const createParagraph = (): RicosExtension => ({
  type: 'node' as const,
  createExtensionConfig: () => ({
    name: 'paragraph',

    priority: 1000,

    addOptions() {
      return {
        HTMLAttributes: {},
      };
    },

    group: 'block',

    content: 'inline*',

    addAttributes() {
      return paragraphDataDefaults;
    },

    parseHTML() {
      return [{ tag: 'div' }];
    },

    renderHTML({ HTMLAttributes, node }) {
      const styles = createStyleAttribute(node);
      return [
        'div',
        mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, styles),
        0,
      ] as DOMOutputSpec;
    },

    addCommands() {
      return {
        setParagraph:
          () =>
          ({ commands }) => {
            return commands.setNode(this.name);
          },
      };
    },

    addKeyboardShortcuts() {
      return {
        'Mod-Alt-0': () => this.editor.commands.setParagraph(),
      };
    },
  }),
});
