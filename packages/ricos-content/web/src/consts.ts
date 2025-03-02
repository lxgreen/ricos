import { Node_Type } from 'ricos-schema';

export const HEADER_BLOCK = Object.freeze({
  ONE: 'header-one',
  TWO: 'header-two',
  THREE: 'header-three',
  FOUR: 'header-four',
  FIVE: 'header-five',
  SIX: 'header-six',
  PARAGRAPH: 'unstyled',
});

export const DEFAULT_TITLE_HEADINGS = ['h2', 'h3'];

export const DEFAULT_HEADINGS = ['h2', 'h3', 'h4', 'h5', 'h6'];

export const BLOCK_TYPES = Object.freeze([
  'header-one',
  'header-two',
  'header-three',
  'header-four',
  'header-five',
  'header-six',
  'unordered-list-item',
  'ordered-list-item',
  'blockquote',
  'atomic',
  'code-block',
  'unstyled',
]);

export const WRAP = 'wrap';
export const NO_WRAP = 'nowrap';
export const UNSTYLED = 'unstyled';
export const BLOCKQUOTE = 'blockquote';
export const NUMBERED_LIST_TYPE = 'ordered-list-item';
export const BULLET_LIST_TYPE = 'unordered-list-item';
export const HEADINGS_TYPE = 'headings';

export const isListType = (type: string): boolean =>
  type === 'ordered-list-item' || type === 'unordered-list-item';

/* eslint-disable camelcase */
export const LINK_BUTTON_TYPE = 'wix-draft-plugin-link-button';
export const ACTION_BUTTON_TYPE = 'wix-draft-plugin-action-button';
export const CODE_BLOCK_TYPE = 'code-block';
export const DIVIDER_TYPE = 'wix-draft-plugin-divider';
export const EMOJI_TYPE = 'wix-draft-plugin-emoji';
export const FILE_UPLOAD_TYPE = 'wix-draft-plugin-file-upload';
export const GALLERY_TYPE = 'wix-draft-plugin-gallery';
export const GIPHY_TYPE = 'wix-draft-plugin-giphy';
export const HASHTAG_TYPE = 'wix-draft-plugin-hashtag';
export const HEADERS_MARKDOWN_TYPE = 'wix-draft-plugin-headers-markdown';
export const HTML_TYPE = 'wix-draft-plugin-html';
export const IMAGE_TYPE = 'wix-draft-plugin-image';
export const IMAGE_TYPE_LEGACY = 'IMAGE';
export const INDENT_TYPE = 'wix-rich-content-plugin-indent';
export const LINE_SPACING_TYPE = 'line-spacing';
export const HEADINGS_DROPDOWN_TYPE = 'wix-rich-content-plugin-headings';
export const SPOILER_TYPE = 'wix-rich-content-plugin-spoiler';
export const COLLAPSIBLE_LIST_TYPE = 'wix-rich-content-plugin-collapsible-list';
export const EXTERNAL_LINK_TYPE = 'wix-draft-plugin-external-link';
export const LINK_TYPE = 'LINK';
export const CUSTOM_LINK_TYPE = 'ricos-plugin-custom-link';
export const LINK_PREVIEW_TYPE = 'wix-draft-plugin-link-preview';
export const MAP_TYPE = 'wix-draft-plugin-map';
export const EXTERNAL_MENTIONS_TYPE = 'wix-draft-plugin-external-mentions';
export const MENTION_TYPE = 'mention';
export const SOUND_CLOUD_TYPE = 'wix-draft-plugin-sound-cloud';
export const TEXT_COLOR_TYPE = 'wix-rich-content-text-color';
export const TEXT_HIGHLIGHT_TYPE = 'wix-rich-content-text-highlight';
export const UNDO_REDO_TYPE = 'wix-rich-content-undo-redo';
export const APP_EMBED_TYPE = 'wix-draft-plugin-vertical-embed';
export const VERTICAL_EMBED_TYPE = 'wix-draft-plugin-vertical-embed';
export const VIDEO_TYPE = 'wix-draft-plugin-video';
export const AUDIO_TYPE = 'ricos-audio';
export const VIDEO_TYPE_LEGACY = 'VIDEO-EMBED';
export const POLL_TYPE = 'wix-draft-plugin-poll';
export const TABLE_TYPE = 'wix-rich-content-plugin-table';
export const ANCHOR_TYPE = 'ANCHOR';
export const PREVIEW = 'PREVIEW';
export const UNSUPPORTED_BLOCKS_TYPE = 'unsupported-blocks';
export const EMBED_TYPE = 'EMBED';
export const EXTERNAL = 'EXTERNAL';

// ricos plugin types
export const RICOS_COLLAPSIBLE_LIST_TYPE = 'ricos-collapsible-list';
export const RICOS_ACTION_BUTTON_TYPE = 'ricos-action-button';
export const RICOS_CODE_BLOCK_TYPE = 'ricos-code-block';
export const RICOS_DIVIDER_TYPE = 'ricos-divider';
export const RICOS_EMOJI_TYPE = 'ricos-emoji';
export const RICOS_FILE_TYPE = 'ricos-file';
export const RICOS_GALLERY_TYPE = 'ricos-gallery';
export const RICOS_GIPHY_TYPE = 'ricos-giphy';
export const RICOS_HASHTAG_TYPE = 'ricos-hashtag';
export const RICOS_HEADERS_MARKDOWN_TYPE = 'ricos-headers-markdown';
export const RICOS_HEADINGS_DROPDOWN_TYPE = 'ricos-heading-dropdown';
export const RICOS_HEADING = 'ricos-heading';
export const RICOS_HTML_TYPE = 'ricos-html';
export const RICOS_IMAGE_TYPE = 'ricos-image';
export const RICOS_INDENT_TYPE = 'ricos-indent';
export const RICOS_LINE_SPACING_TYPE = 'ricos-line-spacing';
export const RICOS_LINK_BUTTON_TYPE = 'ricos-link-button';
export const RICOS_LINK_PREVIEW_TYPE = 'ricos-link-preview';
export const RICOS_MAP_TYPE = 'ricos-map';
export const RICOS_POLL_TYPE = 'ricos-poll';
export const RICOS_SPOILER_TYPE = 'ricos-spoiler';
export const RICOS_TABLE_TYPE = 'ricos-table';
export const RICOS_TEXT_COLOR_TYPE = 'ricos-text-color';
export const RICOS_TEXT_HIGHLIGHT_TYPE = 'ricos-text-highlight';
export const RICOS_UNDO_REDO_TYPE = 'ricos-undo-redo';
export const RICOS_VERTICAL_EMBED_TYPE = 'ricos-vertical-embed';
export const RICOS_VIDEO_TYPE = 'ricos-video';
export const RICOS_ANCHOR_TYPE = 'ricos-anchor';
export const RICOS_COLOR_TYPE = 'ricos-color';
export const RICOS_LINK_TYPE = 'ricos-link';
export const RICOS_MENTION_TYPE = 'ricos-mention';
export const RICOS_FONT_SIZE_TYPE = 'ricos-font-size';
export const RICOS_BOLD_TYPE = 'ricos-bold';
export const RICOS_ITALIC_TYPE = 'ricos-italic';

export const RICOS_EXTERNAL_LINK_TYPE = 'ricos-external-link'; // TODO: is this type needed?
export const RICOS_EXTERNAL_MENTION_TYPE = 'ricos-external-mention'; // TODO: is this type needed?

// tiptap plugins types
export const TIPTAP_DIVIDER_TYPE = Node_Type.DIVIDER;
export const TIPTAP_IMAGE_TYPE = Node_Type.IMAGE;
export const TIPTAP_GALLERY_TYPE = Node_Type.GALLERY;
export const TIPTAP_FILE_TYPE = Node_Type.FILE;
export const TIPTAP_GIF_TYPE = Node_Type.GIF;
export const TIPTAP_VIDEO_TYPE = Node_Type.VIDEO;
export const TIPTAP_AUDIO_TYPE = Node_Type.AUDIO;
export const TIPTAP_LINK_PREVIEW_TYPE = Node_Type.LINK_PREVIEW;
export const TIPTAP_EMBED_TYPE = Node_Type.EMBED;
export const TIPTAP_POLL_TYPE = Node_Type.POLL;
export const TIPTAP_APP_EMBED_TYPE = Node_Type.APP_EMBED;
export const TIPTAP_COLLAPSIBLE_LIST_TYPE = Node_Type.COLLAPSIBLE_LIST;
export const TIPTAP_COLLAPSIBLE_ITEM_TYPE = Node_Type.COLLAPSIBLE_ITEM;
export const TIPTAP_COLLAPSIBLE_ITEM_TITLE_TYPE = Node_Type.COLLAPSIBLE_ITEM_TITLE;
export const TIPTAP_COLLAPSIBLE_ITEM_BODY_TYPE = Node_Type.COLLAPSIBLE_ITEM_BODY;
export const TIPTAP_HTML_TYPE = Node_Type.HTML;
export const TIPTAP_CODE_BLOCK_TYPE = Node_Type.CODE_BLOCK;

export const RICOS_NODE_TYPE_TO_DATA_FIELD = {
  [Node_Type.BUTTON]: 'buttonData',
  [Node_Type.DIVIDER]: 'dividerData',
  [Node_Type.FILE]: 'fileData',
  [Node_Type.GALLERY]: 'galleryData',
  [Node_Type.GIF]: 'gifData',
  [Node_Type.HTML]: 'htmlData',
  [Node_Type.IMAGE]: 'imageData',
  [Node_Type.COLLAPSIBLE_LIST]: 'collapsibleListData',
  [Node_Type.LINK_PREVIEW]: 'linkPreviewData',
  [Node_Type.MAP]: 'mapData',
  [Node_Type.APP_EMBED]: 'appEmbedData',
  [Node_Type.VIDEO]: 'videoData',
  [Node_Type.POLL]: 'pollData',
  [Node_Type.TABLE]: 'tableData',
  [Node_Type.TABLE_CELL]: 'tableCellData',
  [Node_Type.PARAGRAPH]: 'paragraphData',
  [Node_Type.LIST_ITEM]: 'paragraphData',
  [Node_Type.HEADING]: 'headingData',
  [Node_Type.CODE_BLOCK]: 'codeBlockData',
  [Node_Type.BLOCKQUOTE]: 'paragraphData',
  [Node_Type.EMBED]: 'embedData',
  [Node_Type.EXTERNAL]: 'externalData',
  [Node_Type.AUDIO]: 'audioData',
} as const;
