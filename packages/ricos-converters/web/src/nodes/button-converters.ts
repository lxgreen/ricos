import type { ButtonNode } from 'ricos-content';
import type { ButtonData } from 'ricos-schema';
import { Node_Type, ButtonData_Type } from 'ricos-schema';
import toCamelCase from 'to-camel-case';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const linkButtonConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.BUTTON,
    convert: (node: ButtonNode) => ({
      type: 'button',
      attrs: {
        id: node.id,
        ...node.buttonData,
        type: toCamelCase(node.buttonData.type),
      },
    }),
  },
  fromTiptap: {
    type: 'button',
    convert: (node: TiptapNode) => {
      const { id, type, ...data } = node.attrs || {};
      return {
        type: Node_Type.BUTTON,
        id,
        nodes: [],
        buttonData: {
          ...(data as ButtonData),
          type: type === 'link' ? ButtonData_Type.LINK : ButtonData_Type.ACTION,
        },
      };
    },
  },
};
