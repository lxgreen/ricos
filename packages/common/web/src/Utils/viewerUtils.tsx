import { safeJsonParse } from './jsonUtils';
import {
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_FONT_SIZE_TYPE,
} from 'ricos-content';
import { isHexColor } from './colorUtils';

export const INLINE_STYLE_TYPES = {
  [RICOS_TEXT_COLOR_TYPE]: 'FG',
  [RICOS_TEXT_HIGHLIGHT_TYPE]: 'BG',
  [RICOS_FONT_SIZE_TYPE]: 'font-size',
};

export type CustomInlineStyleType = keyof typeof INLINE_STYLE_TYPES;

export const parseStyleByType = (style: string, type: CustomInlineStyleType) => {
  const property = INLINE_STYLE_TYPES[type];
  const cssRule = safeJsonParse(style);
  return cssRule?.[property];
};

export const dynamicStyleParsers = {
  [RICOS_TEXT_COLOR_TYPE]: (style: string, styleSelectionPredicate?: (style: string) => boolean) =>
    parseStyleByType(style, RICOS_TEXT_COLOR_TYPE) ||
    ((styleSelectionPredicate?.(style) || isHexColor(style)) && style),
  [RICOS_TEXT_HIGHLIGHT_TYPE]: (
    style: string,
    styleSelectionPredicate?: (style: string) => boolean
  ) =>
    parseStyleByType(style, RICOS_TEXT_HIGHLIGHT_TYPE) ||
    (styleSelectionPredicate?.(style) && style),
  [RICOS_FONT_SIZE_TYPE]: (style: string) => parseStyleByType(style, RICOS_FONT_SIZE_TYPE),
};

export const defaultStyleFnMapper = {
  [RICOS_TEXT_COLOR_TYPE]: (style: string) => {
    const parsedStyle = dynamicStyleParsers[RICOS_TEXT_COLOR_TYPE](style);
    return parsedStyle ? { color: parsedStyle } : undefined;
  },
  [RICOS_TEXT_HIGHLIGHT_TYPE]: (style: string) => {
    const parsedStyle = dynamicStyleParsers[RICOS_TEXT_HIGHLIGHT_TYPE](style, isHexColor);
    return parsedStyle ? { backgroundColor: parsedStyle } : undefined;
  },
  [RICOS_FONT_SIZE_TYPE]: (style: string) => {
    const parsedStyle = dynamicStyleParsers[RICOS_FONT_SIZE_TYPE](style);
    return parsedStyle ? { fontSize: parsedStyle } : undefined;
  },
};
