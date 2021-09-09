import {
  getSelectedBlocks,
  getSelectionRange,
  isInSelectionRange,
  EditorState,
  Modifier,
  DraftOffsetKey,
} from '../index';
import { uniq } from 'lodash';
import {
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_FONT_SIZE_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  defaultStyleFnMapper,
  CustomInlineStyleType,
  INLINE_STYLE_TYPES,
  dynamicStyleParsers,
} from 'wix-rich-content-common';

const getBlockStyleRanges = (block, styleSelectionPredicate?: (style: string) => unknown) => {
  const styleRanges: { start: number; end: number; style: string }[] = [];

  block.findStyleRanges(
    character => {
      const styles = character.getStyle();
      return styles
        .toArray()
        .filter(style => (styleSelectionPredicate ? styleSelectionPredicate(style) : style));
    },
    (start, end) => {
      const styles = block
        .getInlineStyleAt(start)
        .filter(style => (styleSelectionPredicate ? styleSelectionPredicate(style) : style));
      styles.toArray().forEach(style => styleRanges.push({ start, end, style }));
    }
  );
  return styleRanges;
};

export const hasOneStyleInSelection = (block, editorState, styleSelectionPredicate) => {
  const blockSelectionRange = getSelectionRange(editorState, block);
  const blockStyleRanges = getBlockStyleRanges(block, styleSelectionPredicate).filter(range =>
    isInSelectionRange(blockSelectionRange, [range.start, range.end])
  );
  return (
    blockStyleRanges.length === 1 &&
    blockStyleRanges[0].start <= blockSelectionRange[0] &&
    blockStyleRanges[0].end >= blockSelectionRange[1]
  );
};

/**
 * getSelectionStyles
 *
 * @param {function} styleSelectionPredicate - style selection criteria
 * @returns {string[]} a set of relevant styles found in selection
 */
export const getSelectionStyles = (styleSelectionPredicate, editorState) => {
  const selectedBlocks = getSelectedBlocks(editorState);
  return uniq(
    selectedBlocks.reduce((selectedStyles, block) => {
      const blockSelectionRange = getSelectionRange(editorState, block);

      // for each selected block, get its style ranges (only for styles that meet the styleSelectionPredicate criteria)
      const blockStyleRanges = getBlockStyleRanges(block, styleSelectionPredicate); // { start, end, style }

      // if style range is in selection, add this style to result set
      return [
        ...selectedStyles,
        ...blockStyleRanges
          .filter(range => isInSelectionRange(blockSelectionRange, [range.start, range.end]))
          .map(range => range.style),
      ];
    }, [])
  );
};

export const removeCurrentInlineStyle = (editorState, styleSelectionPredicate) => {
  const selection = editorState.getSelection();
  const currentStyles = getSelectionStyles(styleSelectionPredicate, editorState);
  return currentStyles.reduce((nextEditorState, style) => {
    const contentState = nextEditorState.getCurrentContent();
    const nextContentState = Modifier.removeInlineStyle(contentState, selection, style);
    return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
  }, editorState);
};

export const setInlineStyle = (editorState, inlineStyle) => {
  const selection = editorState.getSelection();
  const contentState = Modifier.applyInlineStyle(
    editorState.getCurrentContent(),
    selection,
    inlineStyle
  );
  return EditorState.push(editorState, contentState, 'change-inline-style');
};

const typeToCss = {
  [RICOS_TEXT_COLOR_TYPE]: 'color',
  [RICOS_TEXT_HIGHLIGHT_TYPE]: 'background-color',
  [RICOS_FONT_SIZE_TYPE]: 'font-size',
};

export const getDefaultStyleFn = (type: CustomInlineStyleType) => styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...defaultStyleFnMapper[type](style),
    };
  }, {});

export const getCustomStyleFn = (
  customStyleFn,
  styleSelectionPredicate,
  type: CustomInlineStyleType
) => {
  const styleParser = dynamicStyleParsers[type];
  return styles => {
    const filteredStyles = styles
      .filter((style: string) => styleParser(style, styleSelectionPredicate))
      .map((style: string) => styleParser(style, styleSelectionPredicate));
    return customStyleFn(filteredStyles);
  };
};

export const getCustomStyleFns = config => {
  const {
    [TEXT_COLOR_TYPE]: colorSetting = {},
    [TEXT_HIGHLIGHT_TYPE]: highlightSettings = {},
  } = config;
  return [
    colorSetting.customStyleFn
      ? getCustomStyleFn(
          colorSetting.customStyleFn,
          colorSetting.styleSelectionPredicate,
          RICOS_TEXT_COLOR_TYPE
        )
      : getDefaultStyleFn(RICOS_TEXT_COLOR_TYPE),
    highlightSettings.customStyleFn
      ? getCustomStyleFn(
          highlightSettings.customStyleFn,
          highlightSettings.styleSelectionPredicate,
          RICOS_TEXT_HIGHLIGHT_TYPE
        )
      : getDefaultStyleFn(RICOS_TEXT_HIGHLIGHT_TYPE),
    getDefaultStyleFn(RICOS_FONT_SIZE_TYPE),
  ];
};

const getInlineStylesByType = (editorState: EditorState, type: CustomInlineStyleType) => {
  const styleParser = dynamicStyleParsers[type];
  return getSelectionStyles(styleParser, editorState).map(style => styleParser(style));
};

const getSelectionStylesFromDOM = (editorState: EditorState, type: CustomInlineStyleType) => {
  let currentStyles: (string | null)[] = [];
  const styleParser = dynamicStyleParsers[type];
  getSelectedBlocks(editorState)
    .filter(block => !hasOneStyleInSelection(block, editorState, styleParser))
    .forEach(block => {
      const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
      const nodes = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`);
      currentStyles = [
        ...currentStyles,
        ...Array.from(nodes).map(node =>
          window.getComputedStyle(node).getPropertyValue(typeToCss[type])
        ),
      ];
    });
  return currentStyles;
};

const setInlineStyleByType = (
  editorState: EditorState,
  type: CustomInlineStyleType,
  style?: string
) => {
  const styleParser = dynamicStyleParsers[type];
  let newEditorState = removeCurrentInlineStyle(editorState, styleParser);
  if (style) {
    const inlineStyle = JSON.stringify({
      [INLINE_STYLE_TYPES[type]]: style,
    });
    newEditorState = setInlineStyle(newEditorState, inlineStyle);
  }
  return newEditorState;
};

export const getFontSize = (editorState: EditorState) => {
  const currentFontSizes = uniq([
    ...getInlineStylesByType(editorState, RICOS_FONT_SIZE_TYPE),
    ...getSelectionStylesFromDOM(editorState, RICOS_FONT_SIZE_TYPE),
  ]);
  return currentFontSizes.length > 1 || currentFontSizes.length === 0 ? '' : currentFontSizes[0];
};

export const setFontSize = (editorState: EditorState, data?: { fontSize?: string }) => {
  let style = data?.fontSize;
  if (style) {
    style += 'px';
  }
  return setInlineStyleByType(editorState, RICOS_FONT_SIZE_TYPE, style);
};

export const getColor = (editorState: EditorState, type: CustomInlineStyleType) => {
  const currentColors = getInlineStylesByType(editorState, type);
  return currentColors[0];
};

export const setTextColor = (editorState: EditorState, data?: { color?: string }) =>
  setInlineStyleByType(editorState, RICOS_TEXT_COLOR_TYPE, data?.color);

export const setHighlightColor = (editorState: EditorState, data?: { color?: string }) =>
  setInlineStyleByType(editorState, RICOS_TEXT_HIGHLIGHT_TYPE, data?.color);
