import type { ListItemNode } from 'ricos-content';
import { Node_Type } from 'ricos-schema';
import type { TiptapNodeConverter, TiptapNode } from '../types';

export const listItemConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.LIST_ITEM,
    convert: (node: ListItemNode) => ({
      type: 'listItem',
      attrs: {
        id: node.id,
      },
    }),
  },
  fromTiptap: {
    type: 'listItem',
    convert: (node: TiptapNode) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.LIST_ITEM,
        id,
        nodes: [],
      };
    },
  },
};
