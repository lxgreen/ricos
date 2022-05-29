// TODO: distribute specific implementations to appropriate packages

import type { ImageNode, TextNode } from 'ricos-content';
import type { Node } from 'ricos-schema';
import { Decoration_Type, Node_Type } from 'ricos-schema';
import type { TiptapNode, TiptapNodeConverter } from './types';
import { TiptapMarkBidiTransfoms } from './tiptap-mark-transforms';
import { boldConverter } from './mark-converters';

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
  const dataProp = Object.keys(node.attrs || {}).find(p => p.endsWith('Data')) || '';
  const { id, ...data } = node.attrs || {};
  return {
    type: node.type,
    convert: (node: TiptapNode) => ({
      type: node.type.toUpperCase() as Node_Type,
      id,
      ...(dataProp ? { [dataProp]: { ...data } } : {}),
      nodes: [],
    }),
  };
};

export const textConverter: TiptapNodeConverter = {
  toTiptap: {
    type: Node_Type.TEXT,
    convert: (node: TextNode) => {
      const transforms = new TiptapMarkBidiTransfoms([boldConverter]).toTiptap();
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
      const transforms = new TiptapMarkBidiTransfoms([boldConverter]).fromTiptap();
      return {
        type: Node_Type.TEXT,
        id: '',
        nodes: [],
        textData: {
          text: node.attrs?.text,
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
