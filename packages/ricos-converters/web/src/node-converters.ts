// TODO: distribute specific implementations to appropriate packages

import type { Node, Node_Type } from 'ricos-schema';
import toConstantCase from 'to-constant-case';
import { linkButtonConverter } from './nodes/button-converters';
import {
  collapsibleItemBodyConverter,
  collapsibleItemConverter,
  collapsibleItemTitleConverter,
} from './nodes/collapsible-list-converters';
import { dividerConverter } from './nodes/divider-converter';
import { headingConverter } from './nodes/heading-converter';
import { imageConverter } from './nodes/image-converter';
import { listItemConverter } from './nodes/list-converters';
import { paragraphConverter } from './nodes/paragraph-converter';
import { tableRowConverter } from './nodes/table-converters';
import { textConverter } from './nodes/text-converter';
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
