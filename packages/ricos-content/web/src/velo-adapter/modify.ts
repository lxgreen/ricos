import * as T from 'fp-ts/Tree';
import { Modifier, TraversalModifier, unfoldTree } from '../RicosContentAPI/modify';
import { fromTraversable, Prism } from 'monocle-ts';
import { RichContent, Node } from 'ricos-schema';

type Callback = (content: RichContent) => void;

class TraversalModifierForAdapter extends TraversalModifier {
  callback?: Callback;

  constructor(callback?: Callback, ...args: ConstructorParameters<typeof TraversalModifier>) {
    super(...args);
    this.callback = callback;
  }

  filter(predicate: (node: Node) => boolean) {
    return new TraversalModifierForAdapter(
      this.callback,
      this.traversal.composePrism(Prism.fromPredicate(predicate)),
      this.tree,
      this.content
    );
  }

  set(setter: (node: Node) => Node | Node[]) {
    const content = super.set(setter);
    this.callback?.(content);
    return content;
  }
}

export const modify = (content: RichContent, callback?: Callback): Modifier =>
  new TraversalModifierForAdapter(
    callback,
    fromTraversable(T.tree)<Node>(),
    unfoldTree(content.nodes),
    content
  );
