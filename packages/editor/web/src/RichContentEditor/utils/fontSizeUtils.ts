import { EditorState, Modifier, getSelectionStyles } from 'wix-rich-content-editor-common';
import { EditorProps } from 'draft-js';

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

export const getFontSize = (editorState: EditorState) => {
  const currentFontSizes = getSelectionStyles(parseStyle, editorState);
  return parseInt(parseStyle(currentFontSizes[0])['font-size']?.split('p')[0] || 15);
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

export const setFontSize = (editorState: EditorState, data: { fontSize?: number }) => {
  const { fontSize } = data;
  const selection = editorState.getSelection();
  const newEditorState = removeCurrentFontSize(editorState);
  let contentState = newEditorState.getCurrentContent();
  if (fontSize) {
    const inlineStyle = JSON.stringify({ 'font-size': fontSize + 'px' });
    contentState = Modifier.applyInlineStyle(contentState, selection, inlineStyle);
  }
  return EditorState.push(newEditorState, contentState, 'change-inline-style');
};
