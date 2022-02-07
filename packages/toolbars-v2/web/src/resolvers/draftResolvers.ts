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

export const alwaysVisibleResolver = DraftContentResolver.create(
  RESOLVERS_IDS.ALWAYS_VISIBLE,
  () => {
    return true;
  }
);
