import {
  getSelectedBlocks,
  getSelectionRange,
  isInSelectionRange,
  EditorState,
  Modifier,
} from 'wix-rich-content-editor-common';
import { uniq } from 'lodash';

const getBlockStyleRanges = (block, styleSelectionPredicate) => {
  const styleRanges = [];

  block.findStyleRanges(
    character => {
      const styles = character.getStyle();
      return styles.toArray().filter(style => styleSelectionPredicate(style));
    },
    (start, end) => {
      const styles = block.getInlineStyleAt(start).filter(style => styleSelectionPredicate(style));
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
  if (blockStyleRanges.length === 1) {
    return (
      blockStyleRanges[0].end - blockStyleRanges[0].start >=
      blockSelectionRange[1] - blockSelectionRange[0]
    );
  }
  return false;
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
  const currentFontSizes = getSelectionStyles(styleSelectionPredicate, editorState);
  const newEditorState = currentFontSizes.reduce((nextEditorState, FontSize) => {
    const contentState = nextEditorState.getCurrentContent();
    const nextContentState = Modifier.removeInlineStyle(contentState, selection, FontSize);
    return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
  }, editorState);
  return EditorState.forceSelection(newEditorState, selection);
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
