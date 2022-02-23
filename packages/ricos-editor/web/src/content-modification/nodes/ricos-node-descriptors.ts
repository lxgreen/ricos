import type { RicosNode } from '../../models/ricos-content';
import type { RefinedNode } from 'ricos-content';
import type { IRicosNodeDescriptors } from '../../models/ricos-descriptor';
import { RicosNodeDescriptor } from './ricos-node-descriptor';

export class RicosNodeDescriptors implements IRicosNodeDescriptors {
  descriptors: RicosNodeDescriptor[];

  static of(nodes: RicosNode<RefinedNode>[]) {
    return new RicosNodeDescriptors(
      nodes.map(node => RicosNodeDescriptor.of(node, { change: 'none' }))
    );
  }

  private constructor(descriptors: RicosNodeDescriptor[]) {
    this.descriptors = descriptors;
  }

  filter(predicate: (node: RicosNode<RefinedNode>) => boolean): RicosNodeDescriptors {
    const descriptors = this.descriptors.filter(descriptor => predicate(descriptor.getNode()));
    return new RicosNodeDescriptors(descriptors);
  }

  insert(node: RicosNode<RefinedNode>): RicosNodeDescriptors {
    const descriptor = RicosNodeDescriptor.of(node, { change: 'add' });
    const descriptors = [...this.descriptors, descriptor];
    return new RicosNodeDescriptors(descriptors);
  }

  modify(
    modification: (node: RicosNode<RefinedNode>) => RicosNode<RefinedNode>
  ): RicosNodeDescriptors {
    const descriptors = this.descriptors.map(descriptor =>
      RicosNodeDescriptor.of(modification(descriptor.getNode()), { change: 'modify' })
    );
    return new RicosNodeDescriptors(descriptors);
  }

  delete(): RicosNodeDescriptors {
    const descriptors = this.descriptors.map(descriptor =>
      RicosNodeDescriptor.of(descriptor.getNode(), { change: 'delete' })
    );
    return new RicosNodeDescriptors(descriptors);
  }

  getModified(): RicosNodeDescriptors {
    const descriptors = this.descriptors.filter(
      descriptor => descriptor.getMetadata().change === 'modify'
    );
    return new RicosNodeDescriptors(descriptors);
  }

  getAdded(): RicosNodeDescriptors {
    const descriptors = this.descriptors.filter(
      descriptor => descriptor.getMetadata().change === 'add'
    );
    return new RicosNodeDescriptors(descriptors);
  }

  getDeleted(): RicosNodeDescriptors {
    const descriptors = this.descriptors.filter(
      descriptor => descriptor.getMetadata().change === 'delete'
    );
    return new RicosNodeDescriptors(descriptors);
  }

  getNodes(): RicosNode<RefinedNode>[] {
    const nodes = this.descriptors.map(descriptor => descriptor.getNode());
    return nodes;
  }
}
