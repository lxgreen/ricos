import { flow, identity } from 'fp-ts/function';
import { not } from 'fp-ts/Predicate';
import { MonoidAll, MonoidAny } from 'fp-ts/boolean';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import { Element, TextNode, serialize } from 'parse5';
import { ContentNode } from '../core/models';
import {
  isText,
  isLeaf,
  isWhitespace,
  hasDescendant,
  appendChild,
  hasTag,
  hasParent,
  oneOf,
  AstRule,
  toAst,
  hasChild,
  hasClass,
} from '../core/parse5-utils';
import { partitionBy } from '../../../nodeUtils';
import traverse from '../core/ast-traversal';
import { concatApply, equals } from '../../../../fp-utils';

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

const collapseWhitespaces: AstRule = [
  concatApply(MonoidAll)([
    isText,
    isWhitespace,
    hasParent(not(oneOf(['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']))),
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

const cleanListItemPadding: AstRule = [
  hasTag('li'),
  (el: Element) => ({
    ...el,
    childNodes: (el.childNodes as Element[]).filter(
      concatApply(MonoidAll)([not(hasTag('br')), not(isWhitespace)])
    ),
  }),
];

const cleanInvalidVideos: AstRule = [
  concatApply(MonoidAll)([
    hasTag('div'),
    hasClass(c => c === 'container-video'),
    not(hasDescendant(hasTag('iframe'))),
  ]),
  (node: Element) => ({
    ...node,
    childNodes: [],
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

const nakedSpanToP: AstRule = [
  concatApply(MonoidAll)([
    hasTag('span'),
    hasParent(not(oneOf(['p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']))),
  ]),
  (node: Element) => ({
    ...node,
    nodeName: 'p',
    tagName: 'p',
  }),
];

const textInDivToP: AstRule = [
  concatApply(MonoidAll)([hasTag('div'), hasChild(isText)]),
  (node: Element) => ({
    ...node,
    childNodes: partitionBy<ContentNode>(
      concatApply(MonoidAll)([not(isText), not(hasTag('p'))]),
      hasTag('p'),
      identity,
      addParagraph(node),
      appendChild
    )(node.childNodes),
  }),
];

const collapseBreaks = flow(
  S.replace(/(<br \/>\s*){3}/, '<br class="double-break" />'),
  S.replace(/(<br \/>\s*){2}/, '<br class="single-break" />')
);

export const preprocess = flow(
  flow(collapseBreaks, toAst),
  flow(traverse(leafParagraphToDiv), traverse(cleanListPadding), traverse(cleanListItemPadding)),
  traverse(cleanInvalidVideos),
  traverse(containerPToDiv),
  traverse(wrapTextUnderLi),
  traverse(collapseWhitespaces),
  traverse(nakedSpanToP),
  traverse(textInDivToP),
  serialize
);
