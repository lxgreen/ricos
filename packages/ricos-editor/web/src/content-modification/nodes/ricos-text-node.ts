import type { TextData, Decoration } from 'ricos-schema';
import type { TextNode } from 'ricos-content';
import type { RicosNode, RicosNodes } from '../../models/ricos-content';
import EmptyNodes from './empty-nodes';

export class RicosTextNode implements RicosNode<TextNode> {
  private readonly node: TextNode;

  private readonly selection: boolean;

  private constructor(node: TextNode, selection: boolean) {
    this.node = node;
    this.selection = selection;
  }

  static of(textNode: TextNode) {
    return new RicosTextNode(textNode, false);
  }

  getRefinedNode(): TextNode {
    return this.node;
  }

  getNodes(): RicosNodes<never> {
    return EmptyNodes.of(this.node.nodes);
  }

  getId(): '' {
    return '';
  }

  getSelection(): boolean {
    return this.selection;
  }

  getData(): TextData {
    return this.node.textData;
  }

  setSelection(selection: boolean): RicosTextNode {
    return new RicosTextNode(this.node, selection);
  }

  setData(data: TextData): RicosTextNode {
    return new RicosTextNode({ ...this.node, textData: data }, this.selection);
  }

  setDecoration(decoration: Decoration): RicosTextNode {
    const decorations = [
      ...this.getData().decorations.filter(
        currDecoration => currDecoration.type !== decoration.type
      ),
      decoration,
    ];
    return this.setData({ ...this.getData(), decorations });
  }

  unsetDecoration(decoration: Decoration): RicosTextNode {
    const decorations = this.getData().decorations.filter(
      currDecoration => currDecoration.type !== decoration.type
    );
    return this.setData({ ...this.getData(), decorations });
  }
}
