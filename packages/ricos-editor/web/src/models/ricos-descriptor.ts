import type { RefinedNode } from 'ricos-content';
import type { RicosNode } from './ricos-content';

export type RicosNodeChange = 'none' | 'add' | 'modify' | 'delete';

export interface RicosNodeMetadata {
  change: RicosNodeChange;
}

export interface IRicosNodeDescriptor {
  getMetadata(): RicosNodeMetadata;
  getNode: () => RicosNode<RefinedNode>;
}

export interface IRicosNodeDescriptors {
  filter(predicate: (node: RicosNode<RefinedNode>) => boolean): IRicosNodeDescriptors;
  insert(node: RicosNode<RefinedNode>): IRicosNodeDescriptors;
  modify(
    modification: (node: RicosNode<RefinedNode>) => RicosNode<RefinedNode>
  ): IRicosNodeDescriptors;
  delete(): IRicosNodeDescriptors;
  getModified(): IRicosNodeDescriptors;
  getAdded(): IRicosNodeDescriptors;
  getDeleted(): IRicosNodeDescriptors;
  getNodes(): RicosNode<RefinedNode>[];
}

export interface DescriptorManager {
  getDescriptors(): IRicosNodeDescriptors;
}
