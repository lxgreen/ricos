import { isNumber, isString, isArray, isObject } from 'lodash';
import { flow } from 'fp-ts/lib/function';
import * as A from 'fp-ts/lib/Array';
import * as O from 'fp-ts/lib/Option';
import { ParagraphData, RichContent, TextData, Node } from 'ricos-schema';
import { resolveFirstRight } from '../fp-utils';
import { ListItemData } from '../types';
import { modify } from './modify';

const isIndexFound = (predicate: (node: Node) => boolean) =>
  flow(
    (content: RichContent) => content.nodes,
    A.findIndex(predicate),
    O.fold(
      () => false,
      () => true
    )
  );

const isIndexInRange = (index?: number) => (content: RichContent) =>
  isNumber(index) && index >= 0 && index < content.nodes.length;

const insertNode = (node: Node, index: number) => (content: RichContent) => ({
  ...content,
  nodes: [...content.nodes.slice(0, index), node, ...content.nodes.slice(index)],
});

const insertNodeByKey = (node: Node, nodeKey: string, isAfter = false) => (content: RichContent) =>
  modify(content)
    .filter(({ id }) => id === nodeKey)
    .set(n => (isAfter ? [n, node] : [node, n]));

export function addNode({
  node,
  index,
  before,
  after,
  content,
}: {
  node: Node;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
}): RichContent {
  return resolveFirstRight(content, { ...content, nodes: [...content.nodes, node] }, [
    [isIndexInRange(index), insertNode(node, <number>index)],
    [isIndexFound(({ id }) => id === before), insertNodeByKey(node, <string>before, false)],
    [isIndexFound(({ id }) => id === after), insertNodeByKey(node, <string>after, true)],
  ]);
}

const isTextData = (text: TextData) => !!text?.text && !!text?.decorations;

const toTextData = (text: string) => ({ text, decorations: [] } as TextData);

const isListItemData = (item: ListItemData) => isArray(item.text) && isObject(item.data);

const toListItemData = (data: ParagraphData) => (text: TextData[]) => ({ data, text });

const emptyListItemData: ListItemData = { text: [], data: {} };

export const toListDataArray = (
  items: string | TextData | ListItemData | (string | TextData | ListItemData)[],
  data: ParagraphData
): ListItemData[] =>
  resolveFirstRight(
    items,
    [],
    [
      [isString, flow(toTextData, A.of, toListItemData(data), A.of)],
      [isTextData, flow(A.of, toListItemData(data), A.of)],
      [isListItemData, i => [i] as ListItemData[]],
      [
        isArray,
        flow(
          A.map(item =>
            resolveFirstRight(item, emptyListItemData, [
              [isString, flow(toTextData, A.of, toListItemData(data))],
              [isTextData, flow(A.of, toListItemData(data))],
              [isListItemData, i => i as ListItemData],
            ])
          )
        ),
      ],
    ]
  );

export const toTextDataArray = (text?: string | TextData | (string | TextData)[]): TextData[] =>
  resolveFirstRight(
    text,
    [],
    [
      [isString, flow(toTextData, A.of)],
      [isTextData, t => [t] as TextData[]],
      [isArray, flow(A.map(t => resolveFirstRight(t, t, [[isString, toTextData]]) as TextData))],
    ]
  );
