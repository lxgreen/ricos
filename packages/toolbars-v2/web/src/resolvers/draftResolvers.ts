import { getFontSize } from 'wix-rich-content-editor';
import { HEADER_BLOCK } from 'wix-rich-content-common';
import { DraftContentResolver } from '../ContentResolver';
import { RESOLVERS_IDS } from './resolvers-ids';

export const isTextContainsBoldResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_BOLD,
  content => {
    return content.getCurrentInlineStyle().has('BOLD');
  }
);

export const isTextContainsItalicResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_ITALIC,
  content => {
    return content.getCurrentInlineStyle().has('ITALIC');
  }
);

export const isTextContainsUnderlineResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_UNDERLINE,
  content => {
    return content.getCurrentInlineStyle().has('UNDERLINE');
  }
);

export const isTextContainsQuoteResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_QUOTE,
  content => {
    const contentState = content.getCurrentContent();
    const blockKey = content.getSelection().getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    return block.getType() === 'blockquote';
  }
);

export const isTextContainsCodeblockResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_CODE_BLOCK,
  content => {
    const contentState = content.getCurrentContent();
    const blockKey = content.getSelection().getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    return block.getType() === 'code-block';
  }
);

export const isTextContainsOrderedListResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_ORDERED_LIST,
  content => {
    const contentState = content.getCurrentContent();
    const blockKey = content.getSelection().getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    return block.getType() === 'ordered-list-item';
  }
);

export const isTextContainsUnorderedListResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_UNORDERED_LIST,
  content => {
    const contentState = content.getCurrentContent();
    const blockKey = content.getSelection().getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    return block.getType() === 'unordered-list-item';
  }
);

export const getAlignmentInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_ALIGNMENT_IN_SELECTION,
  content => {
    const selection = content.getSelection();
    const contentState = content.getCurrentContent();
    const block = contentState.getBlockForKey(selection.getStartKey());
    const {
      data: { textAlignment },
    } = block.toJS();
    return textAlignment;
  }
);

export const getHeadingInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_HEADING_IN_SELECTION,
  content => {
    const contentState = content.getCurrentContent();
    const blockKey = content.getSelection().getAnchorKey();
    const block = contentState.getBlockForKey(blockKey);
    const blockType = block.getType();
    const headings = Object.values(HEADER_BLOCK);
    return headings.find(headingType => blockType === headingType);
  }
);

export const getLineSpacingInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_IN_SELECTION,
  content => {
    const anchorKey = content.getSelection().getAnchorKey();
    const block = content.getCurrentContent().getBlockForKey(anchorKey);
    const {
      data: { dynamicStyles = {} },
    } = block.toJS();
    return dynamicStyles['line-height'];
  }
);

export const getLineSpacingBeforeSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_BEFORE_SELECTION,
  content => {
    const anchorKey = content.getSelection().getAnchorKey();
    const block = content.getCurrentContent().getBlockForKey(anchorKey);
    const {
      data: { dynamicStyles = {} },
    } = block.toJS();
    return dynamicStyles['padding-top'];
  }
);

export const getLineSpacingAfterSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_AFTER_SELECTION,
  content => {
    const anchorKey = content.getSelection().getAnchorKey();
    const block = content.getCurrentContent().getBlockForKey(anchorKey);
    const {
      data: { dynamicStyles = {} },
    } = block.toJS();
    return dynamicStyles['padding-bottom'];
  }
);

export const getFontSizeInSelectionResolver = DraftContentResolver.create(
  RESOLVERS_IDS.GET_FONT_SIZE_IN_SELECTION,
  content => {
    const fontSize = getFontSize(content);
    return fontSize;
  }
);

export const isTextContainsSpoilerResolver = DraftContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_SPOILER,
  content => {
    return content.getCurrentInlineStyle().has('wix-rich-content-plugin-spoiler');
  }
);

export const alwaysVisibleResolver = DraftContentResolver.create(
  RESOLVERS_IDS.ALWAYS_VISIBLE,
  () => {
    return true;
  }
);
