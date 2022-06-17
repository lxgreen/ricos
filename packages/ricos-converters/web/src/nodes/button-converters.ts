import type { ButtonNode } from 'ricos-content';
import type { ButtonData } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const linkButtonConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.BUTTON,
    convert: (node: ButtonNode) => ({
      type: Node_Type.BUTTON,
      attrs: {
        ...node.buttonData,
        id: node.id,
      },
    }),
  },
  fromTiptap: {
    type: Node_Type.BUTTON,
    convert: (node: TiptapNode) => {
      const { id, ...data } = node.attrs || {};
      return {
        type: Node_Type.BUTTON,
        id,
        nodes: [],
        buttonData: {
          ...(data as ButtonData),
        },
      };
    },
  },
};
