import { addNode } from '../RicosContentAPI/builder-utils';
import { RichContent, Node } from 'ricos-schema';
class Builder {
  private callback?: (content: RichContent) => void;

  private content: RichContent;

  constructor(content: RichContent, callback?: (content: RichContent) => void) {
    this.content = content;
    this.callback = callback;
  }

  private add(addNodeParams: Parameters<typeof addNode>[0]) {
    this.content = addNode(addNodeParams);
    this.callback?.(this.content);
    return this;
  }

  append(node: Node) {
    return this.add({ node, content: this.content });
  }

  insertBefore(id: string, node: Node) {
    return this.add({ node, content: this.content, before: id });
  }

  insertAfter(id: string, node: Node) {
    return this.add({ node, content: this.content, after: id });
  }

  insertAt(index: number, node: Node) {
    return this.add({ node, content: this.content, index });
  }

  get() {
    return this.content;
  }
}

export const createBuilder = (content: RichContent, callback?: (content: RichContent) => void) =>
  new Builder(content, callback);
