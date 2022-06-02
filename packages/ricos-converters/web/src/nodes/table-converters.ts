import type { TableRowNode } from 'ricos-content';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const tableRowConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.TABLE_ROW,
    convert: (node: TableRowNode) => ({
      type: Node_Type.TABLE_ROW,
      attrs: {
        id: node.id,
      },
    }),
  },
  fromTiptap: {
    type: Node_Type.TABLE_ROW,
    convert: (node: TiptapNode) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.TABLE_ROW,
        id,
        nodes: [],
      };
    },
  },
};
