import type { RicosNode } from '../../models/ricos-content';
import type { RefinedNode } from 'ricos-content';
import type { IRicosNodeDescriptor, RicosNodeMetadata } from '../../models/ricos-descriptor';

export class RicosNodeDescriptor implements IRicosNodeDescriptor {
  node: RicosNode<RefinedNode>;

  metadata: RicosNodeMetadata;

  static of(node: RicosNode<RefinedNode>, metadata: RicosNodeMetadata): RicosNodeDescriptor {
    return new RicosNodeDescriptor(node, metadata);
  }

  private constructor(node: RicosNode<RefinedNode>, metadata: RicosNodeMetadata) {
    this.node = node;
    this.metadata = metadata;
  }

  getMetadata(): RicosNodeMetadata {
    return this.metadata;
  }

  getNode(): RicosNode<RefinedNode> {
    return this.node;
  }
}
