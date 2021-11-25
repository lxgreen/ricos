/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  CODE_BLOCK_TYPE,
  RICOS_DIVIDER_TYPE,
  DIVIDER_TYPE,
  RICOS_FILE_TYPE,
  FILE_UPLOAD_TYPE,
  RICOS_GALLERY_TYPE,
  GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  GIPHY_TYPE,
  RICOS_HTML_TYPE,
  HTML_TYPE,
  RICOS_IMAGE_TYPE,
  IMAGE_TYPE,
  RICOS_VIDEO_TYPE,
  VIDEO_TYPE,
  RICOS_POLL_TYPE,
  POLL_TYPE,
  RICOS_LINK_TYPE,
  RICOS_MENTION_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  UNSTYLED,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
  BLOCKQUOTE,
  HEADER_BLOCK,
  RICOS_FONT_SIZE_TYPE,
  DocumentStyle,
  EXTERNAL,
} from 'ricos-content';
import {
  DividerData,
  GIFData,
  HTMLData,
  GalleryData,
  PollData,
  VideoData,
  FileData,
  LinkData,
  ImageData,
  ColorData,
  Link,
} from 'ricos-schema';
import { MentionData } from './pluginTypes';
import { TextAlignment, InlineStyle } from './commonTypes';
import { RicosCustomStyles } from './themeTypes';
export type ColorType = typeof RICOS_TEXT_COLOR_TYPE | typeof RICOS_TEXT_HIGHLIGHT_TYPE;

type PluginsList = string[];

type BlockKey = string;

type TextBlockType =
  | typeof UNSTYLED
  | typeof NUMBERED_LIST_TYPE
  | typeof BULLET_LIST_TYPE
  | typeof CODE_BLOCK_TYPE
  | typeof BLOCKQUOTE
  | typeof HEADER_BLOCK.ONE
  | typeof HEADER_BLOCK.TWO
  | typeof HEADER_BLOCK.THREE
  | typeof HEADER_BLOCK.FOUR
  | typeof HEADER_BLOCK.FIVE
  | typeof HEADER_BLOCK.SIX;

type Selection = {
  isFocused?: boolean;
  isCollapsed?: boolean;
  startKey?: string;
  endKey?: string;
};

type draftSelection = {
  anchorKey?: string;
  anchorOffset?: number;
  focusKey?: string;
  focusOffset?: number;
  isBackward?: boolean;
  hasFocus?: boolean;
};

interface PluginsDataMap {
  [RICOS_DIVIDER_TYPE]?: DividerData;
  [DIVIDER_TYPE]?: any;
  [RICOS_GIPHY_TYPE]?: GIFData;
  [GIPHY_TYPE]?: any;
  [RICOS_HTML_TYPE]?: HTMLData;
  [HTML_TYPE]?: any;
  [RICOS_GALLERY_TYPE]?: GalleryData;
  [GALLERY_TYPE]?: any;
  [RICOS_POLL_TYPE]?: PollData;
  [POLL_TYPE]?: any;
  [RICOS_VIDEO_TYPE]?: VideoData;
  [VIDEO_TYPE]?: any;
  [RICOS_FILE_TYPE]?: FileData;
  [FILE_UPLOAD_TYPE]?: any;
  [RICOS_IMAGE_TYPE]?: ImageData;
  [IMAGE_TYPE]?: any;
  [EXTERNAL]?: any;
}

export const CUSTOM_LINK = 'custom-link';

export interface DecorationsDataMap {
  [RICOS_LINK_TYPE]?: LinkData;
  [CUSTOM_LINK]?: LinkData;
  [RICOS_MENTION_TYPE]?: MentionData;
  [RICOS_TEXT_COLOR_TYPE]?: { color?: ColorData['foreground'] };
  [RICOS_TEXT_HIGHLIGHT_TYPE]?: { color?: ColorData['background'] };
  [RICOS_INDENT_TYPE]?: number;
  [RICOS_LINE_SPACING_TYPE]?: any;
  [RICOS_FONT_SIZE_TYPE]?: string;
}

export interface EditorCommands {
  getSelection: () => Selection;
  getAnchorableBlocks: () => {
    anchorableBlocks: any[];
    pluginsIncluded: string[];
  };
  getDocumentStyle: () => DocumentStyle | undefined;
  getColor: (colorType: ColorType) => string | undefined;
  getFontSize: () => string | undefined;
  getTextAlignment: () => TextAlignment;
  getAnchorBlockInlineStyles: () => Record<string, string>;
  hasInlineStyle: (style: InlineStyle) => boolean;
  isBlockTypeSelected: (type: TextBlockType) => boolean;
  isUndoStackEmpty: () => boolean;
  isRedoStackEmpty: () => boolean;
  hasLinkInSelection: () => boolean;
  getLinkDataInSelection: () => Link | undefined;
  getSelectedData: () => any;
  getPluginsList: (settings?: { isRicosSchema?: boolean }) => PluginsList;
  scrollToBlock: (blockKey: BlockKey) => void;
  isBlockInContent: (blockKey: BlockKey) => boolean;
  toggleBlockOverlay: (blockKey: BlockKey) => void;
  getBlockSpacing: () => any;
  saveEditorState: () => void;
  loadEditorState: () => void;
  saveSelectionState: () => void;
  loadSelectionState: () => void;
  insertDecoration: <K extends keyof DecorationsDataMap>(
    type: K,
    data?: DecorationsDataMap[K],
    settings?: {
      isRicosSchema?: boolean;
    }
  ) => void;
  triggerDecoration: <K extends keyof Pick<DecorationsDataMap, typeof RICOS_MENTION_TYPE>>(
    type: K
  ) => void;
  deleteDecoration: <
    K extends keyof Omit<
      DecorationsDataMap,
      | typeof RICOS_MENTION_TYPE
      | typeof RICOS_INDENT_TYPE
      | typeof RICOS_LINE_SPACING_TYPE
      | typeof CUSTOM_LINK
    >
  >(
    type: K
  ) => void;
  insertBlock: <K extends keyof PluginsDataMap>(
    type: K,
    data?: PluginsDataMap[K],
    settings?: {
      isRicosSchema?: boolean;
    }
  ) => string;
  setBlock: <K extends keyof PluginsDataMap>(
    blockKey: BlockKey,
    type: K,
    data?: PluginsDataMap[K],
    settings?: {
      isRicosSchema?: boolean;
    }
  ) => void;
  deleteBlock: (blockKey: BlockKey) => void;
  undo: () => void;
  redo: () => void;
  toggleInlineStyle: (inlineStyle: InlineStyle) => void;
  setBlockType: (type: TextBlockType) => void;
  setTextAlignment: (textAlignment: TextAlignment) => void;
  _setSelection: (blockKey: BlockKey, selection: draftSelection) => void;
  updateDocumentStyle: (documentStyle: DocumentStyle) => void;
  clearSelectedBlocksInlineStyles: (exclude?: string[]) => void;
  getWiredFontStyles: (
    customStyles?: RicosCustomStyles,
    isMobile?: boolean
  ) => Record<string, string> | undefined;
  isAtomicBlockInSelection: () => boolean;
  getAnchorBlockType: () => string;
}
