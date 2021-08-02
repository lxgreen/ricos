import { identity, pipe, flow } from 'fp-ts/function';
import { not } from 'fp-ts/Predicate';
import * as A from 'fp-ts/Array';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';
import * as S from 'fp-ts/string';
import * as RONEA from 'fp-ts/ReadonlyNonEmptyArray';

import {
  Node,
  TextStyle_TextAlignment,
  TextStyle,
  PluginContainerData,
  PluginContainerData_Alignment,
  Decoration_Type,
} from 'ricos-schema';
import { TextNode, Element } from 'parse5';
import { concatApply } from '../../../../fp-utils';
import {
  oneOf,
  hasTag,
  getStyle,
  getClassNames,
  hasStyleRule,
  hasStyleFor,
  hasClass,
  hasParent,
} from '../core/parse5-utils';
import { preprocess } from './preprocess';
import postprocess from './postprocess';
import parse from '../core/parser';
import {
  pToParagraph,
  lToList,
  hToHeading,
  textToText,
  imgToImage,
  identityRule,
} from '../core/rules';
import { iframeToVideo } from './iframeToVideo';
import { aToCustomLink } from './aToCustomLink';
import { Rule } from '../core/models';
import { MonoidAll } from 'fp-ts/boolean';

const noEmptyLineText: Rule = [
  node => textToText[0](node) && (node as TextNode).value !== '\n',
  textToText[1],
];

const traverseDiv: Rule = [hasTag('div'), identityRule[1]];

const traverseSpan: Rule = [
  concatApply(MonoidAll)([
    hasTag('span'),
    not(hasStyleFor('font-weight')),
    not(hasStyleFor('font-style')),
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
    pToStyledParagraph,
    brToEmptyParagraph,
    lToList,
    hToStyledHeading,
    aToCustomLink,
    fontWeightToBold,
    fontStyleToItalic,
    iframeToAlignedVideo,
    imgToAlignedImage,
    traverseDiv,
    traverseSpan,
  ]),
  postprocess
);
