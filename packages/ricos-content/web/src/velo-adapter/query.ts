import { get } from 'lodash';
import type { RichContent, Node } from 'ricos-schema';
import type { Extractor } from '../extractor-infra';
import { extract } from '../RicosContentAPI/extract';
import { compare } from './utils';

class Query {
  private extractor: Extractor<Node>;

  private _limit: number;

  constructor(content: RichContent) {
    this.extractor = extract(content.nodes);
    this._limit = -1;
  }

  private filter(predicate: (node: Node) => boolean) {
    this.extractor = this.extractor.filter(predicate);
    return this;
  }

  private get() {
    const results = this.extractor.get();
    if (this._limit >= 0) {
      return results.slice(0, this._limit);
    }
    return results;
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

  limit(count: number) {
    this._limit = count;
    return this;
  }

  count() {
    return this.get().length;
  }

  find() {
    return this.get();
  }
}

export const query = (content: RichContent) => new Query(content);
