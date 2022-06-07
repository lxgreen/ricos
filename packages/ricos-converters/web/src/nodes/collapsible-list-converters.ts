import type {
  CollapsibleItemBodyNode,
  CollapsibleItemNode,
  CollapsibleItemTitleNode,
} from 'ricos-content';
import type { Node } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { TiptapNode, TiptapNodeConverter } from '../types';

export const collapsibleItemConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM,
    convert: (node: CollapsibleItemNode, visit: (node: CollapsibleItemNode) => TiptapNode[]) => ({
      type: Node_Type.COLLAPSIBLE_ITEM,
      attrs: {
        id: node.id,
      },
      content: visit(node),
    }),
  },
  fromTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM,
    convert: (node: TiptapNode, visit: (node: TiptapNode) => Node[]) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM,
        id,
        nodes: visit(node),
      };
    },
  },
};

export const collapsibleItemTitleConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
    convert: (
      node: CollapsibleItemTitleNode,
      visit: (node: CollapsibleItemTitleNode) => TiptapNode[]
    ) => ({
      type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
      attrs: {
        id: node.id,
      },
      content: visit(node),
    }),
  },
  fromTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
    convert: (node: TiptapNode, visit: (node: TiptapNode) => Node[]) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
        id,
        nodes: visit(node),
      };
    },
  },
};

export const collapsibleItemBodyConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM_BODY,
    convert: (
      node: CollapsibleItemBodyNode,
      visit: (node: CollapsibleItemBodyNode) => TiptapNode[]
    ) => ({
      type: Node_Type.COLLAPSIBLE_ITEM_BODY,
      attrs: {
        id: node.id,
      },
      content: visit(node),
    }),
  },
  fromTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM_BODY,
    convert: (node: TiptapNode, visit: (node: TiptapNode) => Node[]) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM_BODY,
        id,
        nodes: visit(node),
      };
    },
  },
};
