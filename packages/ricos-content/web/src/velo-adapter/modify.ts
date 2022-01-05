import { pipe } from 'fp-ts/function';
import type { Node, RichContent } from 'ricos-schema';
import type { Modifier } from '../modifier-infra';
import type { RichContentModifier } from '../RicosContentAPI/modify';
import { modify as richContentModify } from '../RicosContentAPI/modify';

const toAdapterModifier = (onSet: (content: RichContent) => void, content: RichContent) =>
  function (modifier: RichContentModifier): RichContentModifier {
    const self: { modifier: RichContentModifier } = { modifier };
    return {
      filter(predicate: Parameters<Modifier<Node>['filter']>[0]) {
        self.modifier = modifier.filter.bind(self.modifier)(predicate);
        self.modifier.set = this.set;
        return self.modifier;
      },
      set(setter: Parameters<Modifier<Node>['set']>[0]) {
        const root = modifier.set.bind(self.modifier)(setter);
        const modifiedContent = { ...content, nodes: root.nodes };
        onSet(modifiedContent);
        return modifiedContent;
      },
    };
  };

export const modify = (
  content: RichContent,
  onSet: (content: RichContent) => void
): RichContentModifier => pipe(content, richContentModify, toAdapterModifier(onSet, content));
