import {
  EditorState,
  getSelectionStyles,
  getSelectedBlocks,
  hasOneStyleInSelection,
  setInlineStyle,
  removeCurrentInlineStyle,
} from 'wix-rich-content-editor-common';
import { uniq } from 'lodash';
import { EditorProps } from 'draft-js';
import { ThemeData, safeJsonParse } from 'wix-rich-content-common';

// Temporarily taken from common/statics/styles/consts.scss should replace with themed\docStyle consts when supported
const defaultFontSizes = {
  'header-one': '32px',
  'header-two': '28px',
  'header-three': '22px',
  'header-four': '1em',
  'header-five': '0.83em',
  'header-six': '0.67em',
  unstyled: '16px',
};

const draftToRicosCustomStyles = {
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h5',
  'header-six': 'h6',
  unstyled: 'p',
};

const getBlockFontSizeByType = (type: string, themeData?: ThemeData) => {
  return (
    themeData?.customStyles?.[draftToRicosCustomStyles[type]]?.fontSize || defaultFontSizes[type]
  );
};

const parseFontSize = style => {
  const cssRule = safeJsonParse(style);
  return cssRule?.['font-size'] ? cssRule : undefined;
};

export const customFontSizeStyleFn: EditorProps['customStyleFn'] = styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...parseFontSize(style),
    };
  }, {});

const getFontSizesWithDefaults = (editorState: EditorState, themeData?: ThemeData) => {
  const currentFontSizes = getSelectionStyles(parseFontSize, editorState).map(
    style => parseFontSize(style)['font-size']
  );
  getSelectedBlocks(editorState)
    .filter(block => !hasOneStyleInSelection(block, editorState, parseFontSize))
    .forEach(block => currentFontSizes.push(getBlockFontSizeByType(block.getType(), themeData)));
  return currentFontSizes;
};

export const getFontSize = (editorState: EditorState, themeData?: ThemeData) => {
  const currentFontSizes = uniq(getFontSizesWithDefaults(editorState, themeData));
  return currentFontSizes.length > 1 || currentFontSizes.length === 0 ? '' : currentFontSizes[0];
};

export const setFontSize = (editorState: EditorState, data?: { fontSize?: string }) => {
  let newEditorState = removeCurrentInlineStyle(editorState, parseFontSize);
  if (data?.fontSize) {
    const inlineStyle = JSON.stringify({ 'font-size': data?.fontSize + 'px' });
    newEditorState = setInlineStyle(newEditorState, inlineStyle);
  }
  return newEditorState;
};
