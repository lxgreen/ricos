import React from 'react';
import {
  InlineStyleMapper,
  getBlocksFromContentState,
  safeJsonParse,
} from 'wix-rich-content-common';

const fontSizeInlineStyleMapper = raw => {
  const rawBlocks = getBlocksFromContentState(raw);
  const mapper = rawBlocks.reduce<InlineStyleMapper>((map, block) => {
    if (block.inlineStyleRanges) {
      block.inlineStyleRanges
        .filter(range => !!safeJsonParse(range.style)?.['font-size'])
        .forEach(range => {
          map[range.style] = (children, { key }) => (
            <span key={key} style={safeJsonParse(range.style)}>
              {children}
            </span>
          );
        });
    }
    return map;
  }, {});
  return () => mapper;
};

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

export const getViewerInlineStyleMappers = contentState => [
  staticInlineStyleMapper,
  fontSizeInlineStyleMapper(contentState),
];
