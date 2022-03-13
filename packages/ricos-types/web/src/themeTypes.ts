import type { AugmentedRequired } from 'utility-types/dist/mapped-types';
import type { CSSProperties } from 'react';

export interface ThemeUtils {
  isBright: (hexColor: string) => boolean;
  adaptForeground: (actionColor?: string, fallbackColor?: string) => string | undefined;
  toCssRgbA: (hexColor: string | undefined, opacity: number) => string | undefined;
}

/** Colors scheme for `Ricos`.
 *
 * {@link https://wix.github.io/ricos/docs/ricos/ricos-api/#theme Read More}
 * @example
 * ```ts
 * const palette: PaletteColors = {
 *  textColor: '#111111',
 *  actionColor: 'rgb(132, 84, 252)',
 *  bgColor: 'transparent',
 * };
 * ```
 */
export interface PaletteColors {
  actionColor?: string;
  bgColor?: string;
  textColor?: string;
  textColorLow?: string;
  disabledColor?: string;
  /** Default is black.
   * When `ActionColor` is too bright, it is replaced with `FallbackColor` when used on bright backgrounds (e.g modals, toolbars).
   * Therefore this color should remain relatively dark. */
  fallbackColor?: string;
}

export interface ThemeData {
  colors?: PaletteColors;
  utils: ThemeUtils;
  customStyles?: RicosCustomStyles;
}
export interface ThemeGeneratorFunction {
  (themeData: AugmentedRequired<ThemeData, 'colors'>): void;
}

export interface CustomTextualStyle {
  fontSize?: CSSProperties['fontSize'];
  fontFamily?: CSSProperties['fontFamily'];
  fontWeight?: CSSProperties['fontWeight'];
  fontStyle?: CSSProperties['fontStyle'];
  textDecoration?: CSSProperties['textDecoration'];
  lineHeight?: CSSProperties['lineHeight'];
  minHeight?: CSSProperties['minHeight'];
  color?: CSSProperties['color'];
}

export interface CustomQuoteStyle extends CustomTextualStyle {
  borderColor?: CSSProperties['borderColor'];
  borderWidth?: CSSProperties['borderWidth'];
  paddingTop?: CSSProperties['paddingTop'];
  paddingBottom?: CSSProperties['paddingBottom'];
  paddingInlineStart?: CSSProperties['paddingInlineStart'];
}

export interface CustomCodeBlockStyle {
  margin?: CSSProperties['margin'];
  padding?: CSSProperties['padding'];
  fontSize?: CSSProperties['fontSize'];
  lineHeight?: CSSProperties['lineHeight'];
}

export interface CustomMentionStyle {
  color: CSSProperties['color'];
  backgroundColor: CSSProperties['backgroundColor'];
}

export interface CustomFooterToolbarStyle {
  marginTop?: CSSProperties['marginTop'];
}

export interface RicosCustomStyles {
  h1?: CustomTextualStyle;
  h2?: CustomTextualStyle;
  h3?: CustomTextualStyle;
  h4?: CustomTextualStyle;
  h5?: CustomTextualStyle;
  h6?: CustomTextualStyle;
  p?: CustomTextualStyle;
  quote?: CustomQuoteStyle;
  link?: CustomTextualStyle;
  hashtag?: CustomTextualStyle;
  button?: Pick<CustomTextualStyle, 'color'>;
  codeBlock?: CustomCodeBlockStyle;
  mention?: CustomMentionStyle;
  footerToolbar?: CustomFooterToolbarStyle;
}

export interface RicosSettingsStyles {
  text?: {
    fontFamily?: CSSProperties['fontFamily'];
    color?: CSSProperties['color'];
  };
  whitebox?: {
    borderRadius?: CSSProperties['borderRadius'];
    boxShadow?: CSSProperties['boxShadow'];
  };
  buttons?: {
    borderRadius?: CSSProperties['borderRadius'];
    textColor?: CSSProperties['color'];
  };
  inputs?: {
    borderColor?: CSSProperties['borderColor'];
    borderRadius?: CSSProperties['borderRadius'];
    placeholderColor?: CSSProperties['color'];
  };
  icons?: {
    color?: CSSProperties['color'];
  };
  dividers?: {
    color?: CSSProperties['color'];
    height?: CSSProperties['height'];
  };
  colorPaletteSelectedButton?: {
    borderRadius?: CSSProperties['borderRadius'];
  };
  smallButtons?: {
    borderRadius?: CSSProperties['borderRadius'];
  };
  bgColor?: {
    backgroundColor?: CSSProperties['backgroundColor'];
  };
}
