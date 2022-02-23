import type { ParagraphNode } from 'ricos-content';
import type { Decoration } from 'ricos-schema';
import type { RicosNodes } from '../../models/ricos-content';
import type { DescriptorManager, IRicosNodeDescriptors } from '../../models/ricos-descriptor';
import { RicosTrackedNodes } from './ricos-nodes';
import { RicosParagraphNode } from './ricos-paragraph-node';

export class RicosParagraphNodes implements RicosNodes<ParagraphNode>, DescriptorManager {
  private trackedNodes: RicosTrackedNodes<ParagraphNode, RicosParagraphNode>;

  static of(nodes: ParagraphNode[]) {
    const trackedNodes = RicosTrackedNodes.withMapper(RicosParagraphNode.of).of(nodes);
    return new RicosParagraphNodes(trackedNodes);
  }

  private constructor(trackedNodes: RicosTrackedNodes<ParagraphNode, RicosParagraphNode>) {
    this.trackedNodes = trackedNodes;
  }

  getDescriptors(): IRicosNodeDescriptors {
    return this.trackedNodes.getDescriptors();
  }

  filter(predicate: (node: RicosParagraphNode) => boolean): RicosParagraphNodes {
    return new RicosParagraphNodes(this.trackedNodes.filter(predicate));
  }

  insert(node: ParagraphNode): RicosParagraphNodes {
    return new RicosParagraphNodes(this.trackedNodes.insert(node));
  }

  modify(modification: (node: RicosParagraphNode) => RicosParagraphNode): RicosParagraphNodes {
    return new RicosParagraphNodes(this.trackedNodes.modify(modification));
  }

  delete(): RicosParagraphNodes {
    return new RicosParagraphNodes(this.trackedNodes.delete());
  }

  asArray(): RicosParagraphNode[] {
    return this.trackedNodes.asArray();
  }

  setDecoration(decoration: Decoration): RicosParagraphNodes {
    const modification = (node: RicosParagraphNode) => node.setDecoration(decoration);
    return this.modify(modification);
  }

  unsetDecoration(decoration: Decoration): RicosParagraphNodes {
    const modification = (node: RicosParagraphNode) => node.unsetDecoration(decoration);
    return this.modify(modification);
  }

  setSelection(nodeIds: string[]): RicosParagraphNodes {
    const modification = (node: RicosParagraphNode) =>
      nodeIds.includes(node.getId()) ? node.setSelection(true) : node;
    return this.modify(modification);
  }

  getRefinedNodes() {
    return this.trackedNodes.getRefinedNodes();
  }
}
