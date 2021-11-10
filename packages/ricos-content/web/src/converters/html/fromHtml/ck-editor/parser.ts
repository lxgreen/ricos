import * as A from 'fp-ts/Array';
import { MonoidAll } from 'fp-ts/boolean';
import { flow, identity, pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { not } from 'fp-ts/Predicate';
import * as RONEA from 'fp-ts/ReadonlyNonEmptyArray';
import * as R from 'fp-ts/Record';
import * as S from 'fp-ts/string';
import { Element } from 'parse5';
import {
  Decoration_Type,
  Node,
  PluginContainerData,
  PluginContainerData_Alignment,
  TextStyle,
  TextStyle_TextAlignment,
} from 'ricos-schema';
import { concatApply } from '../../../../fp-utils';
import { createParagraphNode } from '../../../nodeUtils';
import { Rule } from '../core/models';
import {
  getClassNames,
  getStyle,
  hasClass,
  hasParent,
  hasStyleFor,
  hasStyleRule,
  hasTag,
  isRoot,
  isText,
  isWhitespace,
  oneOf,
} from '../core/parse5-utils';
import parse from '../core/parser';
import {
  hToHeading,
  identityRule,
  imgToImage,
  lToList,
  pToParagraph,
  textToText,
} from '../core/rules';
import { aToCustomLink } from './aToCustomLink';
import { iframeToVideo } from './iframeToVideo';
import postprocess from './postprocess';
import { preprocess } from './preprocess';

const noEmptyLineText: Rule = [
  concatApply(MonoidAll)([isText, not(isWhitespace), not(hasParent(isRoot))]),
  textToText[1],
];

// TODO: remove direct nodeUtils usage
const rootTextToP: Rule = [
  concatApply(MonoidAll)([isText, hasParent(isRoot)]),
  ctx => el => [createParagraphNode(textToText[1](ctx)(el))],
];

const traverseDiv: Rule = [hasTag('div'), identityRule[1]];

const traverseSpan: Rule = [
  concatApply(MonoidAll)([
    hasTag('span'),
    not(hasStyleFor('font-weight')),
    not(hasStyleFor('font-style')),
    not(hasStyleFor('text-decoration')),
  ]),
  identityRule[1],
];

const fontStyleToItalic: Rule = [
  concatApply(MonoidAll)([hasTag('span'), hasStyleRule({ 'font-style': 'italic' })]),
  ({ addDecoration }) => (el: Element) => addDecoration(Decoration_Type.ITALIC, {}, el),
];

const fontWeightToBold: Rule = [
  concatApply(MonoidAll)([hasTag('span'), hasStyleRule({ 'font-weight': 'bold' })]),
  ({ addDecoration }) => (el: Element) => addDecoration(Decoration_Type.BOLD, {}, el),
];

const textDecorationToUnderline: Rule = [
  concatApply(MonoidAll)([hasTag('span'), hasStyleRule({ 'text-decoration': 'underline' })]),
  ({ addDecoration }) => (el: Element) => addDecoration(Decoration_Type.UNDERLINE, {}, el),
];

type Alignment = 'LEFT' | 'RIGHT' | 'CENTER' | '';

const alignmentToTextStyle = (alignment: Alignment): Partial<TextStyle> => ({
  textAlignment: alignment as TextStyle_TextAlignment,
});

const alignmentToContainerData = (align: Alignment) => ({
  alignment: align as PluginContainerData_Alignment,
});

const getAlignment = flow(
  RONEA.filter((c: string) => ['align-left', 'align-right', 'align-center'].includes(c)),
  O.map(RONEA.head),
  O.map(S.replace('align-', '')),
  O.fold(() => '', S.toUpperCase)
);

const getAlignmentByClass = flow(getClassNames, getAlignment);
const hasAlignmentClass = flow(getAlignmentByClass, Boolean);

const mergeWithTextStyle = (dataProp: string, textStyle: Partial<TextStyle>) => (node: Node) => ({
  ...node,
  [dataProp]: { ...node[dataProp], textStyle: { ...node[dataProp].textStyle, ...textStyle } },
});

const mergeWithContainerData = (dataProp: string, containerData: PluginContainerData) => (
  node: Node
) => ({
  ...node,
  [dataProp]: {
    ...node[dataProp],
    containerData: { ...node[dataProp].containerData, ...containerData },
  },
});

const lineHeightToTextStyle = (lineHeight?: string): Partial<TextStyle> => ({ lineHeight });

const getLineHeight = flow(
  getStyle,
  O.chain(R.lookup('line-height')),
  O.fold(() => '', identity)
);

const pToStyledParagraph: Rule = [
  pToParagraph[0],
  context => (element: Element) =>
    pipe(
      element,
      pToParagraph[1](context),
      A.map(
        hasAlignmentClass(element)
          ? mergeWithTextStyle(
              'paragraphData',
              pipe(element, getAlignmentByClass, alignmentToTextStyle)
            )
          : identity
      ),
      A.map(
        hasStyleFor('line-height')(element)
          ? mergeWithTextStyle('paragraphData', pipe(element, getLineHeight, lineHeightToTextStyle))
          : identity
      )
    ),
];

const hToStyledHeading: Rule = [
  hToHeading[0],
  context => (element: Element) =>
    pipe(
      element,
      hToHeading[1](context),
      A.map(
        hasAlignmentClass(element)
          ? mergeWithTextStyle(
              'headingData',
              pipe(element, getAlignmentByClass, alignmentToTextStyle)
            )
          : identity
      ),
      A.map(
        hasStyleFor('line-height')(element)
          ? mergeWithTextStyle('headingData', pipe(element, getLineHeight, lineHeightToTextStyle))
          : identity
      )
    ),
];

const iframeToAlignedVideo: Rule = [
  iframeToVideo[0],
  context => (element: Element) => {
    return pipe(
      element,
      iframeToVideo[1](context),
      A.map(
        hasAlignmentClass(element)
          ? mergeWithContainerData(
              'videoData',
              pipe(element, getAlignmentByClass, alignmentToContainerData)
            )
          : identity
      )
    );
  },
];

const imgToAlignedImage: Rule = [
  imgToImage[0],
  context => (element: Element) => {
    return pipe(
      element,
      imgToImage[1](context),
      A.map(
        hasAlignmentClass(element)
          ? mergeWithContainerData(
              'imageData',
              pipe(element, getAlignmentByClass, alignmentToContainerData)
            )
          : mergeWithContainerData('imageData', {
              alignment: PluginContainerData_Alignment.CENTER,
            })
      )
    );
  },
];

const brToEmptyParagraph: Rule = [
  concatApply(MonoidAll)([
    hasTag('br'),
    hasParent(not(oneOf(['ol', 'ul', 'li']))),
    hasClass(c => c === 'single-break' || c === 'double-break'),
  ]),
  context => (el: Element) =>
    hasClass(c => c === 'single-break')(el)
      ? pToParagraph[1](context)(el)
      : [...pToParagraph[1](context)(el), ...pToParagraph[1](context)(el)],
];

export default flow(
  preprocess,
  parse([
    noEmptyLineText,
    rootTextToP,
    pToStyledParagraph,
    brToEmptyParagraph,
    lToList,
    hToStyledHeading,
    aToCustomLink,
    fontWeightToBold,
    fontStyleToItalic,
    textDecorationToUnderline,
    iframeToAlignedVideo,
    imgToAlignedImage,
    traverseDiv,
    traverseSpan,
  ]),
  postprocess
);
