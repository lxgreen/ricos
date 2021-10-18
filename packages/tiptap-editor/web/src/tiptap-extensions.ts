// TODO: dropcursor + gapcursor are required for the drag/drop indication
// currently, there's plugin key collision exception when they are used due to key autogeneration in prose-mirror and possibly dynamic loading. the issue should be resolved by extension implementation that adds unique prosemirror plugin key rather than using autogeneration

// import Dropcursor from '@tiptap/extension-dropcursor';
// import Gapcursor from '@tiptap/extension-gapcursor';
import Document from '@tiptap/extension-document';
import Underline from '@tiptap/extension-underline';
import Text from '@tiptap/extension-text';
// import History from '@tiptap/extension-history';
import Italic from '@tiptap/extension-italic';
import CodeBlock from '@tiptap/extension-code-block';
import Heading from '@tiptap/extension-heading';
import Blockquote from '@tiptap/extension-blockquote';
import OrderedList from '@tiptap/extension-ordered-list';
import ListItem from '@tiptap/extension-list-item';
import Paragraph from './extensions/extension-paragraph';
import { createLink } from './extensions/extension-link';
import { createBold } from './extensions/extension-bold';
import { createColor } from './extensions/extension-color';
import { createBulletedList } from './extensions/extension-bulleted-list';
import { createSpoiler } from './extensions/extension-spoiler';
import { HeadingData } from 'ricos-schema';
import { Attributes, Extensions, MarkConfig, NodeConfig } from '@tiptap/react';
import styles from './statics/styles.scss';

const extendedAttrs = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  attrs: Attributes | Record<string, any>
): Partial<NodeConfig & MarkConfig> => ({
  addAttributes() {
    return {
      ...this.parent?.(),
      ...attrs,
    };
  },
});

const withID = extendedAttrs({
  id: {
    default: '',
    keepOnSplit: false,
  },
});
export const tiptapExtensions: Extensions = [
  Blockquote.configure({
    HTMLAttributes: {
      class: styles.quote,
    },
  }).extend(withID),
  Underline,
  Document.extend(extendedAttrs({ metadata: {} })),
  Heading.extend(withID).extend(extendedAttrs(HeadingData.fromJSON({}))),
  Italic,
  ListItem.extend(withID),
  OrderedList.extend(withID),
  Paragraph.extend(withID),
  Text,
  ...createLink(),
  createBulletedList().extend(withID),
  createBold(),
  createColor(),
  CodeBlock.configure({
    HTMLAttributes: {
      class: styles.code,
    },
  }).extend(withID),
  createSpoiler(),
];
