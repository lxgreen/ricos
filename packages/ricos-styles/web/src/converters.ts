import toCamelCase from 'to-camel-case';
import type { Decoration, DocumentStyle, TextNodeStyle } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { RicosCustomStyles, CustomTextualStyle, RicosTheme } from 'ricos-types';

export const toCustomStyleType = (nodeType: keyof DocumentStyle): keyof RicosCustomStyles =>
  ({
    headerOne: 'h1',
    headerTwo: 'h2',
    headerThree: 'h3',
    headerFour: 'h4',
    headerFive: 'h5',
    headerSix: 'h6',
    paragraph: 'p',
  }[nodeType] as keyof RicosCustomStyles);

// TODO: complete interface CustomTextualStyle {
//   lineHeight?: CSSProperties['lineHeight'];
//   minHeight?: CSSProperties['minHeight'];
// }
export const toDecoration = (
  textStyle: CustomTextualStyle,
  decorationType: Decoration_Type
): Decoration => {
  const type = toCamelCase(decorationType) as keyof CustomTextualStyle;

  return {
    type: decorationType,
    ...(decorationType === Decoration_Type.BOLD && {
      fontWeightValue: parseInt(textStyle?.fontWeight as string),
    }),
    ...(decorationType === Decoration_Type.FONT_SIZE && {
      [`${type}Data`]: { value: textStyle[type], unit: 'PX' },
    }),
    ...(decorationType === Decoration_Type.COLOR && {
      [`${type}Data`]: {
        foreground: textStyle[type],
        // background: textStyle.backgroundColor,
      },
    }),
    ...(decorationType === Decoration_Type.UNDERLINE && {
      [`${type}Data`]: (textStyle?.textDecoration as string)?.includes(type),
    }),
    ...(decorationType === Decoration_Type.ITALIC && {
      [`${type}Data`]: textStyle?.fontStyle?.includes(type),
    }),
  };
};

const fromDecoration = (decoration: Decoration): CustomTextualStyle => {
  const type = decoration.type;
  return {
    ...(type === Decoration_Type.BOLD && { fontWeight: decoration.fontWeightValue }),
    ...(type === Decoration_Type.FONT_SIZE && { fontSize: decoration.fontSizeData?.value }),
    ...(type === Decoration_Type.COLOR && { color: decoration.colorData?.foreground }),
    // ...(type === Decoration_Type.COLOR && { backgroundColor: decoration.colorData?.background }),
    ...(type === Decoration_Type.UNDERLINE && { textDecoration: 'underline' }),
    ...(type === Decoration_Type.ITALIC && { fontStyle: 'italic' }),
  };
};

const toCustomStyle = (node: TextNodeStyle): CustomTextualStyle =>
  node.decorations.map(fromDecoration).reduce((curr, val) => ({ ...curr, ...val }));

export const toTheme = (documentStyle: DocumentStyle): RicosTheme => ({
  customStyles: Object.entries(documentStyle)
    .map(([key, value]) => ({
      [toCustomStyleType(key as keyof DocumentStyle)]: toCustomStyle(value as TextNodeStyle),
    }))
    .reduce((curr, value) => ({ ...curr, ...value }), {}),
});
