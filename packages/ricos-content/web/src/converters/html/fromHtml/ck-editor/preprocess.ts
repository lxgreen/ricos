import { not, flow, identity } from 'fp-ts/function';
import { MonoidAll, MonoidAny } from 'fp-ts/boolean';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import { Element, TextNode, serialize } from 'parse5';
import { ContentNode } from '../core/models';
import {
  isText,
  isLeaf,
  hasDescendant,
  appendChild,
  hasTag,
  hasParent,
  oneOf,
  AstRule,
  toAst,
  hasChild,
} from '../core/parse5-utils';
import { partitionBy } from '../../../nodeUtils';
import traverse from '../core/ast-traversal';
import { concatApply, trim, equals } from '../../../../fp-utils';

const addParagraph = (parentNode: Element) => (): ContentNode => ({
  nodeName: 'p',
  tagName: 'p',
  childNodes: [],
  parentNode,
  attrs: parentNode.attrs,
  namespaceURI: parentNode.namespaceURI,
});

const containerPToDiv: AstRule = [
  concatApply(MonoidAll)([hasTag('p'), hasDescendant(oneOf(['img', 'iframe', 'ol', 'ul']))]),
  (node: Element) => ({
    ...node,
    tagName: 'div',
    nodeName: 'div',
    childNodes: partitionBy<ContentNode>(
      hasDescendant(oneOf(['img', 'iframe', 'ol', 'ul'])),
      hasTag('p'),
      identity,
      addParagraph(node),
      appendChild
    )(node.childNodes),
  }),
];

const leafParagraphToDiv: AstRule = [
  concatApply(MonoidAll)([isLeaf, hasTag('p')]),
  (node: Element) => ({
    ...node,
    tagName: 'div',
    nodeName: 'div',
  }),
];

const isWhitespace = flow(
  (n: TextNode) => O.fromNullable(n.value),
  O.map(trim),
  O.fold(() => false, equals(S.Eq)(''))
);

const collapseWhitespaces: AstRule = [
  concatApply(MonoidAll)([
    isText,
    isWhitespace,
    hasParent(not(oneOf(['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']))),
  ]),
  (node: TextNode) => ({
    ...node,
    value: '',
  }),
];

const cleanListPadding: AstRule = [
  oneOf(['ol', 'ul']),
  (node: Element) => ({
    ...node,
    childNodes: (node.childNodes as Element[]).filter(not(isText)),
  }),
];

const wrapTextUnderLi: AstRule = [
  concatApply(MonoidAll)([hasTag('li'), hasChild(isText)]),
  (node: Element) => ({
    ...node,
    childNodes: partitionBy<ContentNode>(
      concatApply(MonoidAny)([hasTag('p'), hasDescendant(oneOf(['img', 'iframe', 'ol', 'ul']))]),
      hasTag('p'),
      identity,
      addParagraph(node),
      appendChild
    )(node.childNodes),
  }),
];

export const preprocess = flow(
  toAst,
  traverse(leafParagraphToDiv),
  traverse(cleanListPadding),
  traverse(containerPToDiv),
  traverse(wrapTextUnderLi),
  traverse(collapseWhitespaces),
  serialize
);
