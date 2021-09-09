import React from 'react';
import {
  defaultStyleFnMapper,
  TEXT_HIGHLIGHT_TYPE,
  TEXT_COLOR_TYPE,
  RICOS_FONT_SIZE_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  getBlocksFromContentState,
  InlineStyleMapper,
  DraftContent,
  InlineStyleMapperFunction,
  CustomInlineStyleType,
  dynamicStyleParsers,
} from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type PluginConfig = Record<string, any>;

const RICOS_TO_DRAFT_TYPE = {
  [RICOS_TEXT_COLOR_TYPE]: TEXT_COLOR_TYPE,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: TEXT_HIGHLIGHT_TYPE,
};

const getDynamicInlineStyleMapper = (
  type: CustomInlineStyleType
): InlineStyleMapperFunction<PluginConfig> => {
  return (config: PluginConfig, raw: DraftContent) => {
    const settings = config[RICOS_TO_DRAFT_TYPE[type] || ''] || {};
    const styleParser = dynamicStyleParsers[type];
    const styleSelectionPredicate = settings.styleSelectionPredicate
      ? (style: string) => styleParser(style, settings.styleSelectionPredicate)
      : (style: string) => !!styleParser(style);
    const customStyleFn = settings.customStyleFn
      ? (style: string) =>
          settings.customStyleFn(styleParser(style, settings.styleSelectionPredicate))
      : defaultStyleFnMapper[type];
    const rawBlocks = getBlocksFromContentState(raw);
    const mapper = rawBlocks.reduce<InlineStyleMapper>((map, block) => {
      if (block.inlineStyleRanges) {
        block.inlineStyleRanges
          .filter(range => styleSelectionPredicate(range.style))
          .forEach(range => {
            map[range.style] = (children, { key }) => (
              <span key={key} style={customStyleFn(range.style)}>
                {children}
              </span>
            );
          });
      }
      return map;
    }, {});
    return () => mapper;
  };
};

const textColorInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_TEXT_COLOR_TYPE);

const textHighlightInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_TEXT_HIGHLIGHT_TYPE);

const fontSizeInlineStyleMapper = getDynamicInlineStyleMapper(RICOS_FONT_SIZE_TYPE);

const staticInlineStyleMapper = mergedStyles => ({
  BOLD: (children, { key }) => <strong key={key}>{children}</strong>,
  ITALIC: (children, { key }) => <em key={key}>{children}</em>,
  UNDERLINE: (children, { key }) => (
    <u key={key} className={mergedStyles.underline}>
      {children}
    </u>
  ),
  CODE: (children, { key }) => (
    <span key={key} className={mergedStyles.code}>
      {children}
    </span>
  ),
});

export const getViewerInlineStyleMappers = (contentState, config) => [
  staticInlineStyleMapper,
  fontSizeInlineStyleMapper({}, contentState),
  textColorInlineStyleMapper(config, contentState),
  textHighlightInlineStyleMapper(config, contentState),
];
