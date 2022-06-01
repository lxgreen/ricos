import type { JSONContent } from '@tiptap/core';
import { firstRight } from 'ricos-content';
import type { Metadata, Node, RichContent } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { ConvertableNode, Transforms, Tree } from './models/converter';
import { nodeConverters } from './node-converters';
import { TiptapNodeBidiTransfoms } from './tiptap-node-transforms';
import type { TiptapNode, TiptapNodeConverter } from './types';

const richContentTree: Tree<Node> = {
  getNodes: (root: Node) => root.nodes,
  setNodes: (nodes: Node[]) => ({ nodes }),
};

const tiptapTree: Tree<TiptapNode> = {
  getNodes: (root: TiptapNode) => root.content as TiptapNode[],
  setNodes: (content: TiptapNode[]) => ({ content }),
};

const transformNode =
  <SrcNode extends ConvertableNode, DestNode extends ConvertableNode>(
    srcTree: Tree<SrcNode>,
    destTree: Tree<DestNode>,
    transforms: Transforms<SrcNode, DestNode>
  ) =>
  (node: SrcNode): DestNode => {
    return {
      ...transforms.byType(node).convert(node),
      ...destTree.setNodes(visit(srcTree, destTree, transforms)(node)),
    };
  };

const visit =
  <SrcNode extends ConvertableNode, DestNode extends ConvertableNode>(
    srcTree: Tree<SrcNode>,
    destTree: Tree<DestNode>,
    transforms: Transforms<SrcNode, DestNode>
  ) =>
  (node: SrcNode): DestNode[] =>
    (srcTree.getNodes(node) || []).map(transformNode(srcTree, destTree, transforms));

const convertTimestamp = (timestamp: unknown): string =>
  firstRight(timestamp, '', [
    [t => typeof t === 'string', t => t as string],
    [t => typeof (t as Date)?.toISOString === 'function', (t: Date) => t.toISOString()],
  ]);

const convertMetadata = (metadata: Metadata) => ({
  ...metadata,
  createdTimestamp: convertTimestamp(metadata.createdTimestamp),
  updatedTimestamp: convertTimestamp(metadata.updatedTimestamp),
});

const toTiptap = (content: RichContent, converters: TiptapNodeConverter[] = []): JSONContent => {
  const transforms = new TiptapNodeBidiTransfoms(converters).toTiptap();
  const ricosRoot = { id: 'root', type: Node_Type.UNRECOGNIZED, nodes: content.nodes };
  return {
    type: 'doc',
    ...tiptapTree.setNodes(visit(richContentTree, tiptapTree, transforms)(ricosRoot)),
    documentStyle: content.documentStyle || {},
    attrs: {
      metadata: convertMetadata(content.metadata || { version: 1 }),
    },
  };
};

const fromTiptap = (content: JSONContent, converters: TiptapNodeConverter[] = []): RichContent => {
  const transforms = new TiptapNodeBidiTransfoms(converters).fromTiptap();
  return {
    metadata: content.attrs?.metadata,
    documentStyle: content.documentStyle,
    ...richContentTree.setNodes(
      visit(tiptapTree, richContentTree, transforms)(content as TiptapNode)
    ),
  } as RichContent;
};

export const fromTiptapWithConverters = (content: JSONContent) =>
  fromTiptap(content, nodeConverters);

export const toTiptapWithConverters = (content: RichContent) => toTiptap(content, nodeConverters);
