import {
  EditorState,
  getSelectionStyles,
  getSelectedBlocks,
  hasOneStyleInSelection,
  setInlineStyle,
  removeCurrentInlineStyle,
  DraftOffsetKey,
} from 'wix-rich-content-editor-common';
import { uniq } from 'lodash';
import { EditorProps } from 'draft-js';
import { safeJsonParse } from 'wix-rich-content-common';

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

const getFontSizesWithDefaults = (editorState: EditorState) => {
  let currentFontSizes: string[] = getSelectionStyles(editorState, parseFontSize).map(
    style => parseFontSize(style)['font-size']
  );
  getSelectedBlocks(editorState)
    .filter(block => !hasOneStyleInSelection(block, editorState, parseFontSize))
    .forEach(block => {
      const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
      const nodes = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`);
      currentFontSizes = [
        ...currentFontSizes,
        ...Array.from(nodes).map(node =>
          window.getComputedStyle(node).getPropertyValue('font-size')
        ),
      ];
    });
  return currentFontSizes;
};

export const getFontSize = (editorState: EditorState) => {
  const currentFontSizes = uniq(getFontSizesWithDefaults(editorState));
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
