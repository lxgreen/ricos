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

export const getLineSpacingInSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_IN_SELECTION,
  content => {
    if (Array.isArray(content) && content.length > 0) {
      const lineHeight = content[0].attrs.textStyle?.lineHeight;
      if (!lineHeight) return undefined;
      return `${lineHeight}`;
    } else {
      return undefined;
    }
  }
);

export const getLineSpacingBeforeSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_BEFORE_SELECTION,
  content => {
    if (Array.isArray(content) && content.length > 0) {
      const paddingTop = content[0].attrs.style?.paddingTop;
      if (!paddingTop) return undefined;
      return paddingTop;
    } else {
      return undefined;
    }
  }
);

export const getLineSpacingAfterSelectionResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.GET_LINE_SPACING_AFTER_SELECTION,
  content => {
    if (Array.isArray(content) && content.length > 0) {
      const paddingBottom = content[0].attrs.style?.paddingBottom;
      if (!paddingBottom) return undefined;
      return paddingBottom;
    } else {
      return undefined;
    }
  }
);

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
      return node?.marks.some(mark => mark.type.name === 'link' || mark.type.name === 'anchor');
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

const getPluginSelectedResolver = (resolverId: string, tiptapPluginName: string) =>
  TiptapContentResolver.create(
    resolverId,
    content => content.length === 1 && content[0].type.name === tiptapPluginName
  );

export const isImageSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_IMAGE_SELECTED, 'image');

export const isVideoSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_VIDEO_SELECTED, 'video');

export const isGallerySelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_GALLERY_SELECTED,
  'gallery'
);

export const isFileSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_FILE_SELECTED, 'file');

export const isAudioSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_AUDIO_SELECTED, 'audio');

export const isHtmlEmbedSelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_HTML_EMBED_SELECTED,
  'html'
);

export const isPollsSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_POLLS_SELECTED, 'poll');

export const isButtonSelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_BUTTON_SELECTED,
  'button'
);

export const isCollapsibleListSelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_COLLAPSIBLE_LIST_SELECTED,
  'collapsibleList'
);

export const isTableSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_TABLE_SELECTED, 'table');

export const isGifSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_GIF_SELECTED, 'gif');

export const isMapSelected = getPluginSelectedResolver(RESOLVERS_IDS.IS_MAP_SELECTED, 'map');

export const isSocialEmbedSelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_SOCIAL_EMBED_SELECTED,
  'embed'
);

export const isVerticalEmbedSelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_VERTICAL_EMBED_SELECTED,
  'appEmbed'
);

export const isDividerSelected = getPluginSelectedResolver(
  RESOLVERS_IDS.IS_DIVIDER_SELECTED,
  'divider'
);

const pluginSelectedResolvers = [
  isImageSelected,
  isVideoSelected,
  isGallerySelected,
  isDividerSelected,
  isVerticalEmbedSelected,
  isSocialEmbedSelected,
  isMapSelected,
  isGifSelected,
  isTableSelected,
  isCollapsibleListSelected,
  isButtonSelected,
  isPollsSelected,
  isHtmlEmbedSelected,
  isAudioSelected,
  isFileSelected,
];

export const isPluginSelectedResolver = TiptapContentResolver.create(
  RESOLVERS_IDS.IS_PLUGIN_SELECTED,
  content => pluginSelectedResolvers.some(isPluginSelected => isPluginSelected.resolve(content))
);
