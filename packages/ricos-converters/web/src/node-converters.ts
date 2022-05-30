// TODO: distribute specific implementations to appropriate packages

import type {
  ButtonNode,
  CollapsibleItemBodyNode,
  CollapsibleItemNode,
  CollapsibleItemTitleNode,
  DividerNode,
  HeadingNode,
  ImageNode,
  ListItemNode,
  ParagraphNode,
  TableRowNode,
  TextNode,
} from 'ricos-content';
import type { ButtonData, DividerData, HeadingData, Node, ParagraphData } from 'ricos-schema';
import { ButtonData_Type, Node_Type } from 'ricos-schema';
import { fromTiptap, toTiptap } from './index';
import { TiptapMarkBidiTransfoms } from './tiptap-mark-transforms';
import { markConverters } from './mark-converters';
import toConstantCase from 'to-constant-case';
import type { TiptapNode, TiptapNodeConverter } from './types';

export const getUnsupportedToTiptap = (node: Node): TiptapNodeConverter['toTiptap'] => {
  const dataProp = Object.keys(node).find(p => p.endsWith('Data'));
  return {
    type: node.type as Node_Type,
    convert: (node: Node) => ({
      type: node.type.toLowerCase(),
      attrs: {
        id: node.id,
        ...(dataProp ? node[dataProp] : {}),
      },
    }),
  };
};

export const getUnsupportedFromTiptap = (node: TiptapNode): TiptapNodeConverter['fromTiptap'] => {
  const { id, ...data } = node.attrs || {};
  return {
    type: node.type,
    convert: (node: TiptapNode) => ({
      type: toConstantCase(node.type) as Node_Type,
      id,
      [`${node.type}Data`]: { ...data },
      nodes: [],
    }),
  };
};

export const textConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.TEXT,
    convert: (node: TextNode) => {
      const transforms = new TiptapMarkBidiTransfoms(markConverters).toTiptap();
      return {
        type: 'text',
        text: node.textData.text,
        attrs: {
          id: '',
        },
        marks: node.textData.decorations.map(d => transforms.byType(d).convert(d)),
      };
    },
  },
  fromTiptap: {
    type: 'text',
    convert: (node: TiptapNode) => {
      const transforms = new TiptapMarkBidiTransfoms(markConverters).fromTiptap();
      return {
        type: Node_Type.TEXT,
        id: '',
        nodes: [],
        textData: {
          text: node.text || '',
          decorations: node.marks?.map(mark => transforms.byType(mark).convert(mark)) || [],
        },
      };
    },
  },
};

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

export const dividerConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.DIVIDER,
    convert: (node: DividerNode) => ({
      type: 'divider',
      attrs: {
        id: node.id,
        ...node.dividerData,
      },
    }),
  },
  fromTiptap: {
    type: 'divider',
    convert: (node: TiptapNode) => {
      const { id, ...data } = node.attrs || {};
      return {
        type: Node_Type.DIVIDER,
        id,
        nodes: [],
        dividerData: {
          ...(data as DividerData),
        },
      };
    },
  },
};

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

export const headingConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.HEADING,
    convert: (node: HeadingNode) => {
      const { id, /*style,*/ headingData } = node || {};
      return {
        type: 'heading',
        attrs: {
          id,
          // ...(style ? { style } : {}),
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

export const linkButtonConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.BUTTON,
    convert: (node: ButtonNode) => ({
      type: 'button',
      attrs: {
        id: node.id,
        ...node.buttonData,
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

export const listItemConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.LIST_ITEM,
    convert: (node: ListItemNode) => ({
      type: 'listItem',
      attrs: {
        id: node.id,
      },
      content: [toTiptap({ nodes: node.nodes })],
    }),
  },
  fromTiptap: {
    type: 'listItem',
    convert: (node: TiptapNode) => {
      const { attrs = {}, content = [] } = node;
      const { id } = attrs;
      return {
        type: Node_Type.LIST_ITEM,
        id,
        nodes: content.map(c => fromTiptap(c).nodes).flatMap(value => value),
      };
    },
  },
};

export const collapsibleItemConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.COLLAPSIBLE_ITEM,
    convert: (node: CollapsibleItemNode) => ({
      type: 'collapsibleItem',
      attrs: {
        id: node.id,
      },
      content: [toTiptap({ nodes: node.nodes })],
    }),
  },
  fromTiptap: {
    type: 'collapsibleItem',
    convert: (node: TiptapNode) => {
      const { attrs = {}, content = [] } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM,
        id,
        nodes: content.map(c => fromTiptap(c).nodes).flatMap(value => value),
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
      content: [toTiptap({ nodes: node.nodes })],
    }),
  },
  fromTiptap: {
    type: 'collapsibleItemTitle',
    convert: (node: TiptapNode) => {
      const { attrs = {}, content = [] } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM_TITLE,
        id,
        nodes: content.map(c => fromTiptap(c).nodes).flatMap(value => value),
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
      content: [toTiptap({ nodes: node.nodes })],
    }),
  },
  fromTiptap: {
    type: 'collapsibleItemBody',
    convert: (node: TiptapNode) => {
      const { attrs = {}, content = [] } = node;
      const { id } = attrs;
      return {
        type: Node_Type.COLLAPSIBLE_ITEM_BODY,
        id,
        nodes: content.map(c => fromTiptap(c).nodes).flatMap(value => value),
      };
    },
  },
};

export const tableRowConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.TABLE_ROW,
    convert: (node: TableRowNode) => ({
      type: 'tableRow',
      attrs: {
        id: node.id,
      },
      content: [toTiptap({ nodes: node.nodes })],
    }),
  },
  fromTiptap: {
    type: 'tableRow',
    convert: (node: TiptapNode) => {
      const { attrs = {}, content = [] } = node;
      const { id } = attrs;
      return {
        type: Node_Type.TABLE_ROW,
        id,
        nodes: content.map(c => fromTiptap(c).nodes).flatMap(value => value),
      };
    },
  },
};

export const nodeConverters = [
  imageConverter,
  dividerConverter,
  textConverter,
  paragraphConverter,
  headingConverter,
  linkButtonConverter,
  listItemConverter,
  collapsibleItemConverter,
  collapsibleItemTitleConverter,
  collapsibleItemBodyConverter,
  tableRowConverter,
];
