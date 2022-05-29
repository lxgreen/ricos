import type { JSONContent } from '@tiptap/core';
import { firstRight } from 'ricos-content';
import type { Metadata, Node, RichContent } from 'ricos-schema';
import { Node_Type } from 'ricos-schema';
import type { ConvertableNode, Transforms, Tree } from './models/converter';
import type { TiptapNode } from './types';

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
    srcTree.getNodes(node).map(transformNode(srcTree, destTree, transforms));

const convertTimestamp = (timestamp: unknown): string =>
  firstRight(timestamp, '', [
    [t => typeof t === 'string', t => t as string],
    [t => typeof (t as Date).toISOString === 'function', (t: Date) => t.toISOString()],
  ]);

const convertMetadata = (metadata: Metadata) => ({
  ...metadata,
  createdTimestamp: convertTimestamp(metadata.createdTimestamp),
  updatedTimestamp: convertTimestamp(metadata.updatedTimestamp),
});

export const toTiptap = (
  content: RichContent,
  transforms: Transforms<Node, TiptapNode>
): JSONContent => {
  return {
    type: 'doc',
    attrs: {
      metadata: convertMetadata(content.metadata || { version: 1 }),
      documentStyle: content.documentStyle,
    },
    ...tiptapTree.setNodes(
      visit<Node, TiptapNode>(
        richContentTree,
        tiptapTree,
        transforms
      )({ id: 'root', type: Node_Type.UNRECOGNIZED, nodes: content.nodes })
    ),
  };
};

export const fromTiptap = (
  content: JSONContent,
  transforms: Transforms<TiptapNode, Node>
): RichContent => {
  return {
    metadata: content.attrs?.metadata,
    documentStyle: content.attrs?.documentStyle,
    ...richContentTree.setNodes(
      visit(tiptapTree, richContentTree, transforms)(content as TiptapNode)
    ),
  } as RichContent;
};
