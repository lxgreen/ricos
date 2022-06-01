import type { HeadingNode } from 'ricos-content';
import type { HeadingData } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const headingConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.HEADING,
    convert: (node: HeadingNode) => {
      const { id, style, headingData } = node || {};
      return {
        type: 'heading',
        attrs: {
          id,
          ...(style ? { style } : {}),
          ...headingData,
        },
      };
    },
  },
  fromTiptap: {
    type: 'heading',
    convert: (node: TiptapNode) => {
      const { id, style, ...data } = node.attrs || {};
      return {
        type: Node_Type.HEADING,
        id,
        nodes: [],
        ...(style ? { style } : {}),
        headingData: {
          ...(data as HeadingData),
        },
      };
    },
  },
};
