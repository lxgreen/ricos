import * as A from 'fp-ts/Array';
import * as E from 'fp-ts/Endomorphism';
import { pipe } from 'fp-ts/function';
import { concatAll } from 'fp-ts/Monoid';
import * as N from 'fp-ts/number';
import { contramap, Ord } from 'fp-ts/Ord';
import { ComponentType } from 'react';
import {
  Aggregate,
  DecoratedNodeExtension,
  DEFAULT_PRIORITY,
  INodeExtension,
  NodeHocComposer,
} from './domain-types';
import { NodeHoc, NodeHocDescriptor, RicosNodeProps } from 'ricos-tiptap-types';

const byPriority: Ord<NodeHocDescriptor> = pipe(
  N.Ord,
  contramap(descriptor => descriptor.priority || DEFAULT_PRIORITY)
);

class NodeHocDescriptors implements Aggregate<NodeHocDescriptor> {
  descriptors: NodeHocDescriptor[];

  constructor(descriptors: NodeHocDescriptor[]) {
    this.descriptors = descriptors;
  }

  asArray() {
    return this.sort().descriptors;
  }

  filter(predicate: (descriptor: NodeHocDescriptor) => boolean) {
    return new NodeHocDescriptors(this.descriptors.filter(predicate));
  }

  sort() {
    return new NodeHocDescriptors(A.sort(byPriority)(this.descriptors));
  }
}

const composeHocs = (component: ComponentType, hocs: NodeHoc<RicosNodeProps>[]): ComponentType =>
  concatAll(E.getMonoid<ComponentType>())(hocs)(component);

export class NodeHocDecorator implements NodeHocComposer {
  private descriptors: NodeHocDescriptors;

  constructor(descriptors: NodeHocDescriptor[]) {
    this.descriptors = new NodeHocDescriptors(descriptors);
  }

  decorate(nodeExtension: INodeExtension): DecoratedNodeExtension {
    const hocsForExtension = this.descriptors
      .filter(desc => desc.nodeTypes.includes(nodeExtension.name) || desc.nodeTypes.includes('*'))
      .asArray();

    const decoratedComponent = composeHocs(
      nodeExtension.getComponent(),
      hocsForExtension.map(h => h.nodeHoc)
    );

    return nodeExtension.asRenderable(decoratedComponent);
  }
}
