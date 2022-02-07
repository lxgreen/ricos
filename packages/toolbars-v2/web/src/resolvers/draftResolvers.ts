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
