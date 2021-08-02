import React from 'react';
import { InlineStyleMapper, getBlocksFromContentState } from 'wix-rich-content-common';

const parseStyle = style => {
  try {
    const rule = JSON.parse(style);
    return rule['font-size'] ? rule : undefined;
  } catch (e) {
    return undefined;
  }
};

const fontSizeInlineStyleMapper = raw => {
  const rawBlocks = getBlocksFromContentState(raw);
  const mapper = rawBlocks.reduce<InlineStyleMapper>((map, block) => {
    if (block.inlineStyleRanges) {
      block.inlineStyleRanges
        .filter(range => !!parseStyle(range.style))
        .forEach(range => {
          map[range.style] = (children, { key }) => (
            <span key={key} style={parseStyle(range.style)}>
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
