import type { RefinedNode } from 'ricos-content';
import type { RicosNode, RicosNodes } from '../../models/ricos-content';
import type { DescriptorManager, IRicosNodeDescriptors } from '../../models/ricos-descriptor';
import { RicosNodeDescriptors } from './ricos-node-descriptors';

export class RicosTrackedNodes<TNode extends RefinedNode, TRicosNode extends RicosNode<TNode>>
  // eslint-disable-next-line prettier/prettier
  implements RicosNodes<TNode>, DescriptorManager {
  private readonly descriptors: IRicosNodeDescriptors;

  private mapper: (nodes: TNode) => TRicosNode;

  private get nodes(): TRicosNode[] {
    return this.descriptors.getNodes() as TRicosNode[];
  }

  static withMapper<TNode extends RefinedNode, TRicosNode extends RicosNode<TNode>>(
    mapper: (node: TNode) => TRicosNode
  ) {
    return { of: RicosTrackedNodes.of(mapper) };
  }

  private static of<TNode extends RefinedNode, TRicosNode extends RicosNode<TNode>>(
    mapper: (node: TNode) => TRicosNode
  ) {
    return function (nodes: TNode[]) {
      return new RicosTrackedNodes(mapper, RicosNodeDescriptors.of(nodes.map(mapper)));
    };
  }

  private constructor(mapper: (node: TNode) => TRicosNode, descriptors: IRicosNodeDescriptors) {
    this.mapper = mapper;
    this.descriptors = descriptors;
  }

  filter(predicate: (node: TRicosNode) => boolean): RicosTrackedNodes<TNode, TRicosNode> {
    return new RicosTrackedNodes(this.mapper, this.descriptors.filter(predicate));
  }

  insert(node: TNode): RicosTrackedNodes<TNode, TRicosNode> {
    return new RicosTrackedNodes(this.mapper, this.descriptors.insert(this.mapper(node)));
  }

  modify(modification: (node: TRicosNode) => TRicosNode): RicosTrackedNodes<TNode, TRicosNode> {
    return new RicosTrackedNodes(this.mapper, this.descriptors.modify(modification));
  }

  delete(): RicosTrackedNodes<TNode, TRicosNode> {
    return new RicosTrackedNodes(this.mapper, this.descriptors.delete());
  }

  getDescriptors(): IRicosNodeDescriptors {
    return this.descriptors;
  }

  asArray(): TRicosNode[] {
    return this.nodes;
  }

  getRefinedNodes() {
    return this.nodes.map(n => n.getRefinedNode());
  }
}
