import * as A from 'fp-ts/Array';
import { flow, pipe } from 'fp-ts/function';
import * as R from 'fp-ts/Record';
import * as T from 'fp-ts/Tuple';
import { fromEntries } from 'ricos-content/libs/utils';
import type { DocumentStyle, TextNodeStyle } from 'ricos-schema';
import type { CustomTextualStyle, RicosCustomStyles, RicosTheme } from 'ricos-types';
import { Decorations } from './decorations';
import NodeStyle from './document-style/node-style';
import TextStyle from './document-style/text-style';
import type { TextNodeType } from './models/styles';

type DocumentStyleTuple = [type: TextNodeType, styles: TextNodeStyle];
type CustomStyleKey = keyof RicosCustomStyles;

const documentToThemeKeyMap: Record<TextNodeType, CustomStyleKey> = {
  headerOne: 'h1',
  headerTwo: 'h2',
  headerThree: 'h3',
  headerFour: 'h4',
  headerFive: 'h5',
  headerSix: 'h6',
  paragraph: 'p',
};

const themeToDocumentKeyMap: Record<CustomStyleKey, TextNodeType> = pipe(
  documentToThemeKeyMap,
  Object.entries,
  A.map(T.swap),
  fromEntries
);

const toCustomStyle = (node: TextNodeStyle): CustomTextualStyle => ({
  ...Decorations.of(node.decorations).toCustomStyle(),
  ...new NodeStyle(node.nodeStyle || {}).toCustomStyle(),
  ...new TextStyle({ lineHeight: node.lineHeight }).toCustomStyle(),
});

const toCustomStyleKey = (nodeType: TextNodeType): CustomStyleKey =>
  documentToThemeKeyMap[nodeType] as CustomStyleKey;

const toTuples = (documentStyle: Record<TextNodeType, TextNodeStyle>): DocumentStyleTuple[] =>
  R.toArray(documentStyle);

const fromTuples = (tuple: [key: CustomStyleKey, value: CustomTextualStyle][]): RicosCustomStyles =>
  fromEntries(tuple);

const toRicosCustomStyles: (documentStyle: DocumentStyle) => RicosCustomStyles = flow(
  toTuples,
  A.map(T.bimap(toCustomStyle, toCustomStyleKey)),
  fromTuples
);

const toTextNodeStyle = (customStyle: CustomTextualStyle): TextNodeStyle => ({
  decorations: Decorations.fromCustomStyle(customStyle).toDecorationArray(),
  nodeStyle: NodeStyle.fromCustomStyle(customStyle).getNodeStyle(),
  lineHeight: TextStyle.fromCustomStyle(customStyle).getTextStyle().lineHeight,
});

const toTextNodeType = (customStyleKey: CustomStyleKey): TextNodeType =>
  themeToDocumentKeyMap[customStyleKey];

const toDocumentStyle: (customStyle: RicosCustomStyles) => DocumentStyle = flow(
  Object.entries,
  A.map(T.bimap(toTextNodeStyle, toTextNodeType)),
  fromEntries
);

export class TextStyleTransformer {
  private customStyle: RicosCustomStyles;

  private constructor(customStyle: RicosCustomStyles) {
    this.customStyle = customStyle;
  }

  static fromTheme(theme: RicosTheme) {
    return new TextStyleTransformer(theme.customStyles || {});
  }

  static fromDocumentStyle(documentStyle: DocumentStyle) {
    const customStyle = toRicosCustomStyles(documentStyle);
    return new TextStyleTransformer(customStyle);
  }

  toThemeCustomStyles() {
    return this.customStyle;
  }

  toDocumentStyle() {
    return toDocumentStyle(this.customStyle);
  }
}
