import { get } from 'lodash';
import type { Node, RichContent } from 'ricos-schema';
import type { Modifier } from '../modifier-infra';
import type { RichContentModifier } from '../RicosContentAPI/modify';
import { modify as richContentModify } from '../RicosContentAPI/modify';
import { compare } from './utils';

class VeloModifier {
  private modifier: RichContentModifier;

  private content: RichContent;

  private onSet: (content: RichContent) => void;

  constructor(onSet: (content: RichContent) => void, content: RichContent) {
    this.onSet = onSet;
    this.modifier = richContentModify(content);
    this.content = content;
  }

  private filter(predicate: (node: Node) => boolean) {
    this.modifier = this.modifier.filter(predicate);
    return this;
  }

  eq(path: string, value: unknown) {
    return this.filter(node => get(node, path) === value);
  }

  gt(path: string, value: string | number) {
    return this.filter(node => compare(value, get(node, path)) > 0);
  }

  lt(path: string, value: string | number) {
    return this.filter(node => compare(value, get(node, path)) < 0);
  }

  isEmpty(path: string) {
    return this.filter(node => get(node, path) === undefined);
  }

  isNotEmpty(path: string) {
    return this.filter(node => get(node, path) !== undefined);
  }

  startsWith(path: string, value: string) {
    return this.filter(node => get(node, path)?.startsWith?.(value));
  }

  endsWith(path: string, value: string) {
    return this.filter(node => get(node, path)?.endsWith?.(value));
  }

  contains(path: string, value: string) {
    return this.filter(node => get(node, path)?.includes?.(value));
  }

  set(setter: Parameters<Modifier<Node>['set']>[0]): RichContent {
    const root = this.modifier.set(setter);
    const modifiedContent = { ...this.content, nodes: root.nodes };
    this.onSet(modifiedContent);
    return modifiedContent;
  }
}

export const modify = (content: RichContent, onSet: (content: RichContent) => void): VeloModifier =>
  new VeloModifier(onSet, content);
