import { Node, mergeAttributes } from '@tiptap/core';
import { Node as ProsemirrorNode } from 'prosemirror-model';
import { ParagraphData } from 'ricos-schema';

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
export const Paragraph = Node.create<ParagraphOptions>({
  name: 'paragraph',

  priority: 1000, //default paragraph is 1000

  defaultOptions: {
    HTMLAttributes: {},
  },

  group: 'block',

  content: 'inline*',

  addAttributes() {
    const attrs: ParagraphData = ParagraphData.fromJSON({});
    return attrs;
  },

  parseHTML() {
    return [{ tag: 'div' }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const styles = createStyleAttribute(node);
    return ['div', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, styles), 0];
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.toggleNode('paragraph', 'paragraph');
      },
    };
  },

  addKeyboardShortcuts() {
    return {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore-next-line
      'Mod-Alt-0': () => this.editor.commands.setParagraph(),
    };
  },
});
