import type { ImageNode } from 'ricos-content';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const imageConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.IMAGE,
    convert: (node: ImageNode) => ({
      type: 'image',
      attrs: {
        id: node.id,
        ...node.imageData,
      },
    }),
  },
  fromTiptap: {
    type: 'image',
    convert: (node: TiptapNode) => {
      const { id, ...data } = node.attrs || {};
      return {
        type: Node_Type.IMAGE,
        id,
        nodes: [],
        imageData: {
          ...data,
        },
      };
    },
  },
};
