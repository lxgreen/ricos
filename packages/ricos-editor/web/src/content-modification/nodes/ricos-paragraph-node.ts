import type { ParagraphNode } from 'ricos-content';
import type { Decoration } from 'ricos-schema';
import type { RicosNode } from '../../models/ricos-content';
import { RicosTextNodes } from './ricos-text-nodes';

export class RicosParagraphNode implements RicosNode<ParagraphNode> {
  private readonly node: ParagraphNode;

  private readonly nodes: RicosTextNodes;

  private readonly selection: boolean;

  private constructor(node: ParagraphNode, nodes: RicosTextNodes, selection: boolean) {
    this.node = node;
    this.nodes = nodes;
    this.selection = selection;
  }

  static of(node: ParagraphNode) {
    const nodes = RicosTextNodes.of(node.nodes);
    return new RicosParagraphNode(node, nodes, false);
  }

  getRefinedNode(): ParagraphNode {
    return {
      ...this.node,
      nodes: this.nodes.getRefinedNodes(),
    };
  }

  getNodes(): RicosTextNodes {
    return this.nodes;
  }

  getId() {
    return this.node.id;
  }

  getSelection(): boolean {
    return this.selection;
  }

  setSelection(selection: boolean): RicosParagraphNode {
    const nodes = this.nodes.setSelection(selection);
    return new RicosParagraphNode(this.node, nodes, selection);
  }

  setDecoration(decoration: Decoration): RicosParagraphNode {
    const nodes = this.nodes.setDecoration(decoration);
    return new RicosParagraphNode(this.node, nodes, this.selection);
  }

  unsetDecoration(decoration: Decoration): RicosParagraphNode {
    const nodes = this.nodes.unsetDecoration(decoration);
    return new RicosParagraphNode(this.node, nodes, this.selection);
  }
}
