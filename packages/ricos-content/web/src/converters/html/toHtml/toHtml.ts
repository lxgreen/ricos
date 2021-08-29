import { flow, pipe } from 'fp-ts/function';
import * as M from 'fp-ts/Monoid';
import * as E from 'fp-ts/Either';
import * as S from 'fp-ts/string';
import * as A from 'fp-ts/Array';
import * as O from 'fp-ts/Option';

import { RichContent, Node, Decoration_Type, Node_Type, Decoration, TextData } from 'ricos-schema';
import { compact } from 'lodash';

export const toHtml = (content: RichContent): string => `${nodeArrayToHtml(content.nodes, '\n')}`;

const nodeArrayToHtml = (nodes: Node[], separator = ''): string =>
  nodes.flatMap(nodeToHtml).join(separator);

const nodeToHtml = (node: Node): string | string[] => {
  if (node.type === Node_Type.TEXT && node.textData) {
    return decorateTextElement(node.textData);
  }
  if (node.type === Node_Type.PARAGRAPH && node.nodes.length === 0) {
    return EMPTY_PARAGRAPH;
  }
  let tag: string = NODE_TO_HTML_TAG[node.type];
  if (node.type === Node_Type.HEADING && node.headingData) {
    const { level } = node.headingData;
    tag = `h${level}`;
  }
  if (tag) {
    const children = nodeArrayToHtml(node.nodes);
    return createHtmlTag(tag, children);
  }
  return [];
};

const createHtmlAttrs = (decoration: Decoration): Record<string, string> => {
  switch (decoration.type) {
    case Decoration_Type.LINK:
      return decoration.linkData?.link?.url ? { href: decoration.linkData.link.url } : {};
    case Decoration_Type.COLOR: {
      const { foreground, background } = decoration.colorData || {};
      const style = pipe(
        [foreground && `color: ${foreground};`, background && `background-color: ${background};`],
        compact,
        M.concatAll(S.Monoid)
      );
      return style ? { style } : {};
    }
    default:
      return {};
  }
};

const createHtmlTag = (tag: string, child: string, attrs: Record<string, string> = {}): string => {
  const isFragment = tag === 'fragment';
  const prefix = tag === 'li' ? '\n  ' : '';
  const suffix = ['ul', 'ol'].includes(tag) ? '\n' : '';
  return isFragment
    ? `${child}${suffix}`
    : `${prefix}<${tag}${attrsToString(attrs)}>${child}${suffix}</${tag}>`;
};

const attrsToString = (attrs: Record<string, string>): string =>
  Object.entries(attrs)
    .map(([key, value]) => ` ${key}="${value}"`)
    .join('');

const toForegroundDecoration = (d: Decoration): O.Option<Decoration> =>
  d.colorData?.foreground
    ? O.some({ type: Decoration_Type.COLOR, colorData: { foreground: d.colorData.foreground } })
    : O.none;

const toBackgroundDecoration = (d: Decoration): O.Option<Decoration> =>
  d.colorData?.background
    ? O.some({ type: Decoration_Type.COLOR, colorData: { background: d.colorData.background } })
    : O.none;

const expandColorDecoration = (decoration: Decoration): Decoration[] =>
  pipe([toBackgroundDecoration, toForegroundDecoration], A.ap(A.of(decoration)), A.compact);

const eitherColorDecoration = (d: Decoration): E.Either<Decoration, Decoration> =>
  d.type === Decoration_Type.COLOR ? E.right(d) : E.left(d);

const normalizeDecorations: (decorations: Decoration[]) => Decoration[] = flow(
  A.map(flow(eitherColorDecoration, E.fold(A.of, expandColorDecoration))),
  A.flatten
);

const decorateTextElement = ({ text, decorations }: TextData): string => {
  const normalizedDecorations = normalizeDecorations(decorations);
  return normalizedDecorations.reduce((child, decoration) => {
    const tag = DECORATION_TO_HTML_TAG[decoration.type];
    return tag ? createHtmlTag(tag, child, createHtmlAttrs(decoration)) : child;
  }, text);
};

const DECORATION_TO_HTML_TAG = {
  [Decoration_Type.COLOR]: 'span',
  [Decoration_Type.BOLD]: 'strong',
  [Decoration_Type.ITALIC]: 'em',
  [Decoration_Type.UNDERLINE]: 'u',
  [Decoration_Type.LINK]: 'a',
};
const NODE_TO_HTML_TAG = {
  [Node_Type.BULLETED_LIST]: 'ul',
  [Node_Type.COLLAPSIBLE_LIST]: 'ul',
  [Node_Type.ORDERED_LIST]: 'ol',
  [Node_Type.LIST_ITEM]: 'li',
  [Node_Type.COLLAPSIBLE_ITEM]: 'li',
  [Node_Type.COLLAPSIBLE_ITEM_TITLE]: 'fragment',
  [Node_Type.COLLAPSIBLE_ITEM_BODY]: 'fragment',
  [Node_Type.PARAGRAPH]: 'p',
};

const EMPTY_PARAGRAPH = '<p><br /></p>';
