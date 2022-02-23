import type { TextNode } from 'ricos-content';
import type { Decoration } from 'ricos-schema';
import type { RicosNodes } from '../../models/ricos-content';
import type { DescriptorManager, IRicosNodeDescriptors } from '../../models/ricos-descriptor';
import { RicosTrackedNodes } from './ricos-nodes';
import { RicosTextNode } from './ricos-text-node';

export class RicosTextNodes implements RicosNodes<TextNode>, DescriptorManager {
  private trackedNodes: RicosTrackedNodes<TextNode, RicosTextNode>;

  static of(nodes: TextNode[]) {
    const trackedNodes = RicosTrackedNodes.withMapper(RicosTextNode.of).of(nodes);
    return new RicosTextNodes(trackedNodes);
  }

  private constructor(nodes: RicosTrackedNodes<TextNode, RicosTextNode>) {
    this.trackedNodes = nodes;
  }

  filter(predicate: (node: RicosTextNode) => boolean): RicosTextNodes {
    return new RicosTextNodes(this.trackedNodes.filter(predicate));
  }

  insert(node: TextNode): RicosTextNodes {
    return new RicosTextNodes(this.trackedNodes.insert(node));
  }

  modify(modification: (node: RicosTextNode) => RicosTextNode): RicosTextNodes {
    return new RicosTextNodes(this.trackedNodes.modify(modification));
  }

  delete(): RicosTextNodes {
    return new RicosTextNodes(this.trackedNodes.delete());
  }

  getDescriptors(): IRicosNodeDescriptors {
    return this.trackedNodes.getDescriptors();
  }

  asArray(): RicosTextNode[] {
    return this.trackedNodes.asArray();
  }

  setDecoration(decoration: Decoration) {
    const modification = (node: RicosTextNode) => node.setDecoration(decoration);
    return this.modify(modification);
  }

  unsetDecoration(decoration: Decoration) {
    const modification = (node: RicosTextNode) => node.unsetDecoration(decoration);
    return this.modify(modification);
  }

  setSelection(selection: boolean) {
    return this.modify(n => n.setSelection(selection));
  }

  getRefinedNodes(): TextNode[] {
    return this.trackedNodes.getRefinedNodes();
  }
}
