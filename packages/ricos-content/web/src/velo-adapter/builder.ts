import { ContentBuilderAdapter, CreateBuilder } from './types';
import { addNode } from '../RicosContentAPI/builder-utils';
import { RichContent } from 'ricos-schema';
import { pipe } from 'fp-ts/function';

const notify: CreateBuilder = (content, callback) => {
  callback?.(content);
  return createBuilder(content, callback);
};

export const createBuilder: CreateBuilder = (content, callback?) => {
  const createNewBuilder = (content: RichContent): ContentBuilderAdapter =>
    notify(content, callback);
  return {
    append: node => pipe(addNode({ node, content }), createNewBuilder),
    insertBefore: (id, node) => pipe(addNode({ node, content, before: id }), createNewBuilder),
    insertAfter: (id, node) => pipe(addNode({ node, content, after: id }), createNewBuilder),
    insertAt: (index, node) => pipe(addNode({ node, content, index }), createNewBuilder),
    get: () => content,
  };
};
