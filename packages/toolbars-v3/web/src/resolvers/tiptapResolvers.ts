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
        return node.type.name === 'text';
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
        return node.type.name === 'text';
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
        return node.type.name === 'text';
      });
      return node?.marks.some(mark => mark.type.name === 'underline');
    }
    return false;
  }
);

export const isTextContainsQuoteResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_QUOTE,
  content => {
    return Array.isArray(content) && content.length > 0 && content[0].type.name === 'blockquote';
  }
);

export const isTextContainsCodeblockResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_CODE_BLOCK,
  content => {
    return Array.isArray(content) && content.length > 0 && content[0].type.name === 'codeBlock';
  }
);

export const isTextContainsOrderedListResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_ORDERED_LIST,
  content => {
    return Array.isArray(content) && content.length > 0 && content[0].type.name === 'orderedList';
  }
);

export const isTextContainsUnorderedListResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_UNORDERED_LIST,
  content => {
    return Array.isArray(content) && content.length > 0 && content[0].type.name === 'bulletedList';
  }
);

export const isTextContainsSpoilerResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_SPOILER,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text';
      });
      return node?.marks.some(mark => mark.type.name === 'spoiler');
    }
    return false;
  }
);

export const getAlignmentInSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_ALIGNMENT_IN_SELECTION,
  content => {
    if (Array.isArray(content) && content.length > 0) {
      const textAlignment = content[0].attrs.textStyle?.textAlignment;
      if (!textAlignment || textAlignment === 'AUTO') return undefined;
      return textAlignment.toLowerCase();
    } else {
      return undefined;
    }
  }
);

export const getHeadingInSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_HEADING_IN_SELECTION,
  content => {
    if (Array.isArray(content) && content.length > 0) {
      const headingLevel = content[0].attrs?.level;
      if (!headingLevel) return 'unstyled';
      const headingMap = {
        1: 'header-one',
        2: 'header-two',
        3: 'header-three',
        4: 'header-four',
        5: 'header-five',
        6: 'header-six',
      };
      return headingMap[headingLevel];
    } else {
      return undefined;
    }
  }
);

// export const getLineSpacingInSelectionResolver = TiptapContentResolver.create(
//   RESOLVERS_IDS.GET_LINE_SPACING_IN_SELECTION,
//   content => {
//     if (Array.isArray(content) && content.length > 0) {
//       return content[0].attrs.textStyle?.lineHeight;
//     } else {
//       return undefined;
//     }
//   }
// );

export const getFontSizeInSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_FONT_SIZE_IN_SELECTION,
  content => {
    if (Array.isArray(content)) {
      let returnedFontSize = '';
      let currentFontSize = '';

      // eslint-disable-next-line fp/no-loops
      for (let i = 0; i < content.length; i++) {
        const node = content[i];

        if (node.type.name === 'text') {
          if (node.marks.length === 0 || !node?.marks.some(mark => mark.type.name === 'fontSize')) {
            //TODO: take font size from documentStyle
            currentFontSize = '16';
          } else {
            const fontSizeMark = node?.marks.find(mark => mark.type.name === 'fontSize');
            currentFontSize = `${fontSizeMark?.attrs.value}`;
          }
          if (returnedFontSize !== '' && returnedFontSize !== currentFontSize) return '';
          returnedFontSize = currentFontSize;
        }
      }
      return returnedFontSize;
    }
  }
);

export const isTextContainsLinkResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_TEXT_CONTAINS_LINK,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text';
      });
      return node?.marks.some(mark => mark.type.name === 'link');
    }
    return false;
  }
);

export const getTextColorInSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_TEXT_COLOR_IN_SELECTION,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text';
      });
      const colorMark = node?.marks.find(mark => mark.type.name === 'color');
      return colorMark?.attrs.foreground;
    }
    return false;
  }
);

export const getHighlightColorInSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_HIGHLIGHT_COLOR_IN_SELECTION,
  content => {
    if (Array.isArray(content)) {
      const node = content.find(node => {
        return node.type.name === 'text';
      });
      const colorMark = node?.marks.find(mark => mark.type.name === 'color');
      return colorMark?.attrs.background;
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
