// TODO: dropcursor + gapcursor are required for the drag/drop indication
// currently, there's plugin key collision exception when they are used due to key autogeneration in prose-mirror and possibly dynamic loading. the issue should be resolved by extension implementation that adds unique prosemirror plugin key rather than using autogeneration

// import Dropcursor from '@tiptap/extension-dropcursor';
// import Gapcursor from '@tiptap/extension-gapcursor';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';
// import History from '@tiptap/extension-history';
import Blockquote from '@tiptap/extension-blockquote';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import { Attributes } from '@tiptap/react';
import styles from './statics/styles.scss';
import { AnyExtension } from '@tiptap/core';

const extendedAttrs = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: Attributes | Record<string, any>
) => ({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...attrs,
    };
  },
});

export const tiptapExtensions: AnyExtension[] = [
  Blockquote.configure({
    HTMLAttributes: {
      class: styles.quote,
    },
  }),
  Document.extend(extendedAttrs({ metadata: {} })),
  ListItem,
  OrderedList,
  Text,
];
