import type { ListItemNode } from 'ricos-content';
import type { Node } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const listItemConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.LIST_ITEM,
    convert: (node: ListItemNode, visit: (node: ListItemNode) => TiptapNode[]) => ({
      type: Node_Type.LIST_ITEM,
      attrs: {
        id: node.id,
      },
      content: visit(node),
    }),
  },
  fromTiptap: {
    type: Node_Type.LIST_ITEM,
    convert: (node: TiptapNode, visit: (node: TiptapNode) => Node[]) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.LIST_ITEM,
        id,
        nodes: visit(node),
      };
    },
  },
};
