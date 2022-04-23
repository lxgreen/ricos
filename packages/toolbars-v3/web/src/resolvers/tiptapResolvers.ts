import { TiptapContentResolver } from '../ContentResolver';
import { RESOLVERS_IDS } from './resolvers-ids';

export const alwaysVisibleResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.ALWAYS_VISIBLE,
  () => {
    return true;
  }
);

export const isTextInSelection = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_IN_SELECTION,
  (content = []) => {
    return content.some(node => node.type.name === 'text');
  }
);

export const isTextContainsBoldResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_BOLD,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text' && node.marks.length > 0;
      });
      return node?.marks.some(mark => mark.type.name === 'bold');
    }
    return false;
  }
);

export const isTextContainsItalicResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_ITALIC,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text' && node.marks.length > 0;
      });
      return node?.marks.some(mark => mark.type.name === 'italic');
    }
    return false;
  }
);

export const isTextContainsUnderlineResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_UNDERLINE,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text' && node.marks.length > 0;
      });
      return node?.marks.some(mark => mark.type.name === 'underline');
    }
    return false;
  }
);

export const isTextContainsSpoilerResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_SPOILER,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text' && node.marks.length > 0;
      });
      return node?.marks.some(mark => mark.type.name === 'spoiler');
    }
    return false;
  }
);

export const isOnlyTextSelected = TiptapContentResolver.create('yaronResolverExample', content => {
  if (Array.isArray(content)) {
    const noneTextNode = content.find(
      node =>
        node.type.name !== 'paragraph' && node.type.name !== 'heading' && node.type.name !== 'text'
    );
    if (noneTextNode) {
      return false;
    } else {
      return true;
    }
  }
  return false;
});
