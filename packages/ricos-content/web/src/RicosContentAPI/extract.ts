import { flow } from 'fp-ts/function';
import { Node, Node_Type } from 'ricos-schema';
import { Extractor, getExtractor } from '../extractor-infra';

const nodesAccessor = (node: Node) => node.nodes;

const getRootNode = (nodes: Node | Node[]): Node =>
  Array.isArray(nodes)
    ? {
        id: 'root',
        type: Node_Type.UNRECOGNIZED,
        nodes,
      }
    : nodes;

export const extract: (nodes: Node | Node[]) => Extractor<Node> = flow(
  getRootNode,
  getExtractor<Node>(nodesAccessor)
);
