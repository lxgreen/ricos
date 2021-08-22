import {
  EditorState,
  Modifier,
  getSelectionStyles,
  getSelectedBlocks,
  hasOneStyleInSelection,
} from 'wix-rich-content-editor-common';
import { uniq } from 'lodash';
import { EditorProps } from 'draft-js';
import { ThemeData } from 'wix-rich-content-common';

// Temporarily taken from common/statics/styles/consts.scss should replace with themed\docStyle consts when supported
const defaultFontSizes = {
  'header-one': '32',
  'header-two': '28',
  'header-three': '22',
  'header-four': '16',
  'header-five': '13',
  'header-six': '11',
  unstyled: '16',
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
  return themeData?.customStyles?.[draftToRicosCustomStyles[type]] || defaultFontSizes[type];
};

const parseStyle = style => {
  try {
    const rule = JSON.parse(style);
    return rule['font-size'] ? rule : undefined;
  } catch (e) {
    return undefined;
  }
};

export const customFontSizeStyleFn: EditorProps['customStyleFn'] = styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...parseStyle(style),
    };
  }, {});

const getFontSizesWithDefaults = (editorState: EditorState, themeData?: ThemeData) => {
  const currentFontSizes = getSelectionStyles(parseStyle, editorState).map(
    style => parseStyle(style)['font-size']?.split('p')[0]
  );
  getSelectedBlocks(editorState)
    .filter(block => !hasOneStyleInSelection(block, editorState, parseStyle))
    .forEach(block => currentFontSizes.push(getBlockFontSizeByType(block.getType(), themeData)));
  return currentFontSizes;
};

export const getFontSize = (editorState: EditorState, themeData?: ThemeData) => {
  const currentFontSizes = uniq(getFontSizesWithDefaults(editorState, themeData));
  return currentFontSizes.length > 1 || currentFontSizes.length === 0 ? '' : currentFontSizes[0];
};

const removeCurrentFontSize = (editorState: EditorState) => {
  const selection = editorState.getSelection();
  const currentFontSizes = getSelectionStyles(parseStyle, editorState);
  return currentFontSizes.reduce((nextEditorState, FontSize) => {
    const contentState = nextEditorState.getCurrentContent();
    const nextContentState = Modifier.removeInlineStyle(contentState, selection, FontSize);
    return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
  }, editorState);
};

export const setFontSize = (editorState: EditorState, data?: { fontSize?: string }) => {
  const selection = editorState.getSelection();
  const newEditorState = removeCurrentFontSize(editorState);
  let contentState = newEditorState.getCurrentContent();
  if (data?.fontSize) {
    const inlineStyle = JSON.stringify({ 'font-size': data?.fontSize + 'px' });
    contentState = Modifier.applyInlineStyle(contentState, selection, inlineStyle);
  }
  return EditorState.push(newEditorState, contentState, 'change-inline-style');
};
