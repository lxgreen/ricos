import type { Node as TiptapNode } from 'prosemirror-model';

export interface IContentResolver<T> {
  id: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  resolve: (content: T) => any;
  description: string;
  type: string;
}

export class TiptapContentResolver implements IContentResolver<TiptapNode[]> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(readonly id, readonly resolve, readonly description) {}

  get type() {
    return 'content';
  }

  static create({ resolve, description }) {
    return new TiptapContentResolver(Math.random().toString(), resolve, description);
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class DraftContentResolver implements IContentResolver<any> {
  // eslint-disable-next-line no-useless-constructor
  private constructor(readonly id, readonly resolve, readonly description) {}

  get type() {
    return 'content';
  }

  static create({ resolve, description }) {
    return new DraftContentResolver(Math.random().toString(), resolve, description);
  }
}
