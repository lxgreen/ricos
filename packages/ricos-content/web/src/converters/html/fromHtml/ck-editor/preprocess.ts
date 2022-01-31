import { flow, identity } from 'fp-ts/function';
import { not } from 'fp-ts/Predicate';
import * as S from 'fp-ts/string';
import type { Element, TextNode, Attribute } from 'parse5';
import { serialize } from 'parse5';
import type { ContentNode } from '../core/models';
import type { AstRule } from '../core/parse5-utils';
import {
  isText,
  isLeaf,
  isWhitespace,
  hasDescendant,
  appendChild,
  hasTag,
  hasParent,
  oneOf,
  toAst,
  hasChild,
  hasClass,
  isRoot,
} from '../core/parse5-utils';
import { partitionBy } from '../../../nodeUtils';
import { traverseRoot, traverse } from '../core/ast-traversal';
import { and, or } from '../../../../fp-utils';

const addParagraph =
  (parentNode: Element, attrs: Attribute[] = []) =>
  (): ContentNode => ({
    nodeName: 'p',
    tagName: 'p',
    childNodes: [],
    parentNode,
    attrs: parentNode.attrs ? parentNode.attrs.concat(attrs) : attrs,
    namespaceURI: parentNode.namespaceURI,
  });

const rootTextToP: AstRule = [
  and([isRoot, or([hasChild(isText), hasChild(hasTag('a'))])]),
  (node: Element) => ({
    ...node,
    childNodes: partitionBy<ContentNode>(
      and([not(isText), not(hasTag('a')), not(hasClass(c => c === 'root-text-anchor'))]),
      and([hasTag('p'), hasClass(c => c === 'root-text-anchor')]),
      identity,
      addParagraph(node, [{ name: 'class', value: 'root-text-anchor' }]),
      appendChild
    )(node.childNodes),
  }),
];

const containerPToDiv: AstRule = [
  and([hasTag('p'), hasDescendant(oneOf(['img', 'iframe', 'ol', 'ul']))]),
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
  and([isLeaf, hasTag('p')]),
  (node: Element) => ({
    ...node,
    tagName: 'div',
    nodeName: 'div',
  }),
];

const collapseWhitespaces: AstRule = [
  and([
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
    childNodes: (el.childNodes as Element[]).filter(and([not(hasTag('br')), not(isWhitespace)])),
  }),
];

const cleanInvalidVideos: AstRule = [
  and([
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
  and([hasTag('li'), hasChild(isText)]),
  (node: Element) => ({
    ...node,
    childNodes: partitionBy<ContentNode>(
      or([hasTag('p'), hasDescendant(oneOf(['img', 'iframe', 'ol', 'ul']))]),
      hasTag('p'),
      identity,
      addParagraph(node),
      appendChild
    )(node.childNodes),
  }),
];

const nakedSpanToP: AstRule = [
  and([
    hasTag('span'),
    hasParent(not(oneOf(['a', 'p', 'span', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']))),
  ]),
  (node: Element) => ({
    ...node,
    nodeName: 'p',
    tagName: 'p',
  }),
];

const textInDivToP: AstRule = [
  and([hasTag('div'), hasChild(isText)]),
  (node: Element) => ({
    ...node,
    childNodes: partitionBy<ContentNode>(
      and([not(isText), not(hasTag('p'))]),
      hasTag('p'),
      identity,
      addParagraph(node),
      appendChild
    )(node.childNodes),
  }),
];

const brToNewLineInRoot: AstRule = [
  and([hasTag('br'), not(hasParent(hasTag('p')))]),
  (node: Element) => ({
    parentNode: node.parentNode,
    nodeName: '#text',
    value: '_ROOT_NEW_LINE_MARKER_',
  }),
];

const brToNewLineInP: AstRule = [
  and([hasTag('br'), hasParent(hasTag('p'))]),
  (node: Element) => ({
    parentNode: node.parentNode,
    nodeName: '#text',
    value: '_P_NEW_LINE_MARKER_',
  }),
];

const collapseBreaks = flow(
  S.replace(/(_ROOT_NEW_LINE_MARKER_\s*){3}/gim, ' '),
  S.replace(/(_ROOT_NEW_LINE_MARKER_\s*){1,2}/gim, ''),
  S.replace(/(_P_NEW_LINE_MARKER_\s*){3}/gim, '\n\n'),
  S.replace(/(_P_NEW_LINE_MARKER_\s*){2}/gim, '\n'),
  S.replace(/(_P_NEW_LINE_MARKER_\s*){1}/gim, '')
);

export const preprocess = flow(
  toAst,
  traverseRoot(rootTextToP),
  traverse(brToNewLineInP),
  traverse(brToNewLineInRoot),
  flow(
    traverse(leafParagraphToDiv),
    traverse(cleanListPadding),
    traverse(cleanListItemPadding),
    traverse(cleanInvalidVideos),
    traverse(containerPToDiv),
    traverse(wrapTextUnderLi),
    traverse(collapseWhitespaces),
    // hack to make nakedSpanToP work -- otherwise does not work correctly
    flow(serialize, toAst, traverse(nakedSpanToP)),
    traverse(textInDivToP)
  ),
  serialize,
  collapseBreaks
);
