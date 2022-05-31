import type {
  CollapsibleItemBodyNode,
  CollapsibleItemNode,
  CollapsibleItemTitleNode,
} from 'ricos-content';
import { Node_Type } from 'ricos-schema';
import type { TiptapNode, TiptapNodeConverter } from '../types';

export const collapsibleItemConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM,
    convert: (node: CollapsibleItemNode) => ({
      type: 'collapsibleItem',
      attrs: {
        id: node.id,
      },
    }),
  },
  fromTiptap: {
    type: 'collapsibleItem',
    convert: (node: TiptapNode) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM,
        id,
        nodes: [],
      };
    },
  },
};

export const collapsibleItemTitleConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
    convert: (node: CollapsibleItemTitleNode) => ({
      type: 'collapsibleItemTitle',
      attrs: {
        id: node.id,
      },
    }),
  },
  fromTiptap: {
    type: 'collapsibleItemTitle',
    convert: (node: TiptapNode) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
        id,
        nodes: [],
      };
    },
  },
};

export const collapsibleItemBodyConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM_BODY,
    convert: (node: CollapsibleItemBodyNode) => ({
      type: 'collapsibleItemBody',
      attrs: {
        id: node.id,
      },
    }),
  },
  fromTiptap: {
    type: 'collapsibleItemBody',
    convert: (node: TiptapNode) => {
      const { attrs = {} } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM_BODY,
        id,
        nodes: [],
      };
    },
  },
};
