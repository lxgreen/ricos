import type { ParagraphNode } from 'ricos-content';
import type { ParagraphData } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const paragraphConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.PARAGRAPH,
    convert: (node: ParagraphNode) => {
      const { id, /*style,*/ paragraphData } = node || {};
      return {
        type: 'paragraph',
        attrs: {
          id,
          // ...(style ? { style } : {}),
          ...paragraphData,
        },
      };
    },
  },
  fromTiptap: {
    type: 'paragraph',
    convert: (node: TiptapNode) => {
      const { id, style, ...data } = node.attrs || {};
      return {
        type: Node_Type.PARAGRAPH,
        id,
        nodes: [],
        ...(style ? { style } : {}),
        paragraphData: {
          ...(data as ParagraphData),
        },
      };
    },
  },
};
