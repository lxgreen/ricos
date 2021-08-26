import {
  getSelectedBlocks,
  getSelectionRange,
  isInSelectionRange,
  EditorState,
  Modifier,
} from '../index';
import { uniq } from 'lodash';

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

export const hasOneStyleInSelection = (
  block,
  editorState: EditorState,
  styleSelectionPredicate?: (style: string) => unknown
) => {
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

export const getSelectionStyles = (
  editorState: EditorState,
  styleSelectionPredicate?: (style: string) => unknown
) => {
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

export const removeCurrentInlineStyle = (
  editorState: EditorState,
  styleSelectionPredicate?: (style: string) => unknown
) => {
  const selection = editorState.getSelection();
  const currentStyles = getSelectionStyles(editorState, styleSelectionPredicate);
  const newEditorState = currentStyles.reduce((nextEditorState, style) => {
    const contentState = nextEditorState.getCurrentContent();
    const nextContentState = Modifier.removeInlineStyle(contentState, selection, style);
    return EditorState.push(nextEditorState, nextContentState, 'change-inline-style');
  }, editorState);
  return EditorState.acceptSelection(newEditorState, selection);
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
