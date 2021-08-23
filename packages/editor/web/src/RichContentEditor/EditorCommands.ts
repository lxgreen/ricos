import { pick } from 'lodash';
import {
  EditorState,
  getColor,
  setTextColor,
  setHighlightColor,
  SelectionState,
  RichUtils,
  setTextAlignment,
  createBlock,
  setEntityData,
  blockKeyToEntityKey,
  deleteBlock,
  undo,
  redo,
  getTextAlignment,
  hasInlineStyle,
  getDraftInlineStyle,
  getBlockType,
  hasLinksInSelection,
  getLinkDataInSelection,
  getEntityData,
  insertLinkAtCurrentSelection,
  removeLinksInSelection,
  triggerMention,
  insertMention,
  indentSelectedBlocks,
  mergeBlockData,
  getAnchorBlockData,
  getAnchorableBlocks,
  ContentState,
} from 'wix-rich-content-editor-common';
import {
  EditorCommands,
  GetEditorState,
  SetEditorState,
  COLLAPSIBLE_LIST_TYPE,
  ACTION_BUTTON_TYPE,
  LINK_BUTTON_TYPE,
  EMOJI_TYPE,
  HASHTAG_TYPE,
  HEADERS_MARKDOWN_TYPE,
  LINE_SPACING_TYPE,
  INDENT_TYPE,
  TABLE_TYPE,
  EXTERNAL_LINK_TYPE,
  LINK_PREVIEW_TYPE,
  SPOILER_TYPE,
  UNDO_REDO_TYPE,
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  VERTICAL_EMBED_TYPE,
  IMAGE_TYPE,
  SOUND_CLOUD_TYPE,
  MAP_TYPE,
  HEADINGS_DROPDOWN_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  POLL_TYPE,
  VIDEO_TYPE,
  LINK_TYPE,
  MENTION_TYPE,
  CODE_BLOCK_TYPE,
  RICOS_COLLAPSIBLE_LIST_TYPE,
  RICOS_ACTION_BUTTON_TYPE,
  RICOS_LINK_BUTTON_TYPE,
  RICOS_EMOJI_TYPE,
  RICOS_HASHTAG_TYPE,
  RICOS_HEADERS_MARKDOWN_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_TABLE_TYPE,
  RICOS_EXTERNAL_LINK_TYPE,
  RICOS_LINK_PREVIEW_TYPE,
  RICOS_SPOILER_TYPE,
  RICOS_UNDO_REDO_TYPE,
  RICOS_HEADINGS_DROPDOWN_TYPE,
  RICOS_MAP_TYPE,
  RICOS_SOUND_CLOUD_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_VERTICAL_EMBED_TYPE,
  RICOS_IMAGE_TYPE,
  RICOS_DIVIDER_TYPE,
  RICOS_FILE_TYPE,
  RICOS_GALLERY_TYPE,
  RICOS_GIPHY_TYPE,
  RICOS_HTML_TYPE,
  RICOS_POLL_TYPE,
  RICOS_VIDEO_TYPE,
  RICOS_LINK_TYPE,
  RICOS_MENTION_TYPE,
  RICOS_CODE_BLOCK_TYPE,
  RICOS_FONT_SIZE_TYPE,
  UNSUPPORTED_BLOCKS_TYPE,
  DocStyle,
  RicosCustomStyles,
} from 'wix-rich-content-common';

import { setFontSize, getFontSize, getDocStyle, setDocStyle } from './utils/fontSizeUtils';

const TO_DRAFT_PLUGIN_TYPE_MAP = {
  [RICOS_DIVIDER_TYPE]: DIVIDER_TYPE,
  [RICOS_FILE_TYPE]: FILE_UPLOAD_TYPE,
  [RICOS_GALLERY_TYPE]: GALLERY_TYPE,
  [RICOS_GIPHY_TYPE]: GIPHY_TYPE,
  [RICOS_HTML_TYPE]: HTML_TYPE,
  [RICOS_IMAGE_TYPE]: IMAGE_TYPE,
  [RICOS_VIDEO_TYPE]: VIDEO_TYPE,
  [RICOS_POLL_TYPE]: POLL_TYPE,
  [RICOS_LINK_TYPE]: LINK_TYPE,
  [RICOS_MENTION_TYPE]: MENTION_TYPE,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: TEXT_HIGHLIGHT_TYPE,
  [RICOS_TEXT_COLOR_TYPE]: TEXT_COLOR_TYPE,
  [DIVIDER_TYPE]: DIVIDER_TYPE,
  [FILE_UPLOAD_TYPE]: FILE_UPLOAD_TYPE,
  [GALLERY_TYPE]: GALLERY_TYPE,
  [GIPHY_TYPE]: GIPHY_TYPE,
  [HTML_TYPE]: HTML_TYPE,
  [IMAGE_TYPE]: IMAGE_TYPE,
  [VIDEO_TYPE]: VIDEO_TYPE,
  [POLL_TYPE]: POLL_TYPE,
  [TEXT_HIGHLIGHT_TYPE]: TEXT_HIGHLIGHT_TYPE,
  [TEXT_COLOR_TYPE]: TEXT_COLOR_TYPE,
  [RICOS_INDENT_TYPE]: RICOS_INDENT_TYPE,
  [RICOS_LINE_SPACING_TYPE]: RICOS_LINE_SPACING_TYPE,
};

const TO_RICOS_PLUGIN_TYPE_MAP = {
  [DIVIDER_TYPE]: RICOS_DIVIDER_TYPE,
  [FILE_UPLOAD_TYPE]: RICOS_FILE_TYPE,
  [GALLERY_TYPE]: RICOS_GALLERY_TYPE,
  [GIPHY_TYPE]: RICOS_GIPHY_TYPE,
  [HTML_TYPE]: RICOS_HTML_TYPE,
  [IMAGE_TYPE]: RICOS_IMAGE_TYPE,
  [VIDEO_TYPE]: RICOS_VIDEO_TYPE,
  [POLL_TYPE]: RICOS_POLL_TYPE,
  [LINK_TYPE]: RICOS_LINK_TYPE,
  [MENTION_TYPE]: RICOS_MENTION_TYPE,
  [COLLAPSIBLE_LIST_TYPE]: RICOS_COLLAPSIBLE_LIST_TYPE,
  [ACTION_BUTTON_TYPE]: RICOS_ACTION_BUTTON_TYPE,
  [LINK_BUTTON_TYPE]: RICOS_LINK_BUTTON_TYPE,
  [CODE_BLOCK_TYPE]: RICOS_CODE_BLOCK_TYPE,
  [EMOJI_TYPE]: RICOS_EMOJI_TYPE,
  [HASHTAG_TYPE]: RICOS_HASHTAG_TYPE,
  [HEADERS_MARKDOWN_TYPE]: RICOS_HEADERS_MARKDOWN_TYPE,
  [INDENT_TYPE]: RICOS_INDENT_TYPE,
  [LINE_SPACING_TYPE]: RICOS_LINE_SPACING_TYPE,
  [TABLE_TYPE]: RICOS_TABLE_TYPE,
  [EXTERNAL_LINK_TYPE]: RICOS_EXTERNAL_LINK_TYPE,
  [LINK_PREVIEW_TYPE]: RICOS_LINK_PREVIEW_TYPE,
  [SPOILER_TYPE]: RICOS_SPOILER_TYPE,
  [UNDO_REDO_TYPE]: RICOS_UNDO_REDO_TYPE,
  [HEADINGS_DROPDOWN_TYPE]: RICOS_HEADINGS_DROPDOWN_TYPE,
  [MAP_TYPE]: RICOS_MAP_TYPE,
  [SOUND_CLOUD_TYPE]: RICOS_SOUND_CLOUD_TYPE,
  [TEXT_COLOR_TYPE]: RICOS_TEXT_COLOR_TYPE,
  [TEXT_HIGHLIGHT_TYPE]: RICOS_TEXT_HIGHLIGHT_TYPE,
  [VERTICAL_EMBED_TYPE]: RICOS_VERTICAL_EMBED_TYPE,
};

export const PluginsToExclude = [UNSUPPORTED_BLOCKS_TYPE];

const triggerDecorationsMap = {
  [RICOS_MENTION_TYPE]: triggerMention,
};

const insertDecorationsMap = {
  [RICOS_LINK_TYPE]: insertLinkAtCurrentSelection,
  [RICOS_MENTION_TYPE]: insertMention,
  [RICOS_TEXT_COLOR_TYPE]: setTextColor,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: setHighlightColor,
  [RICOS_FONT_SIZE_TYPE]: setFontSize,
  [RICOS_INDENT_TYPE]: indentSelectedBlocks,
  [RICOS_LINE_SPACING_TYPE]: mergeBlockData,
};

const deleteDecorationsMapFuncs = {
  [RICOS_LINK_TYPE]: removeLinksInSelection,
  [RICOS_TEXT_COLOR_TYPE]: setTextColor,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: setHighlightColor,
  [RICOS_FONT_SIZE_TYPE]: setFontSize,
};

let savedEditorState;
let savedSelectionState;

export const createEditorCommands = (
  createPluginsDataMap,
  plugins,
  getEditorState: GetEditorState,
  setEditorState: SetEditorState,
  customStyles?: RicosCustomStyles
): EditorCommands => {
  const setBlockType: EditorCommands['setBlockType'] = type => {
    setEditorState(RichUtils.toggleBlockType(getEditorState(), type));
  };

  const _setSelection: EditorCommands['_setSelection'] = (blockKey, selection) =>
    setEditorState(
      EditorState.forceSelection(
        getEditorState(),
        SelectionState.createEmpty(blockKey).merge(selection || {})
      )
    );

  const editorState: {
    getSelection: EditorCommands['getSelection'];
    getAnchorableBlocks: EditorCommands['getAnchorableBlocks'];
    getColor: EditorCommands['getColor'];
    getFontSize: EditorCommands['getFontSize'];
    getTextAlignment: EditorCommands['getTextAlignment'];
    hasInlineStyle: EditorCommands['hasInlineStyle'];
    isBlockTypeSelected: EditorCommands['isBlockTypeSelected'];
    isUndoStackEmpty: EditorCommands['isUndoStackEmpty'];
    isRedoStackEmpty: EditorCommands['isRedoStackEmpty'];
    hasLinkInSelection: EditorCommands['hasLinkInSelection'];
    getLinkDataInSelection: EditorCommands['getLinkDataInSelection'];
    getSelectedData: EditorCommands['getSelectedData'];
    getPluginsList: EditorCommands['getPluginsList'];
    getBlockSpacing: EditorCommands['getBlockSpacing'];
    saveEditorState: EditorCommands['saveEditorState'];
    loadEditorState: EditorCommands['loadEditorState'];
    saveSelectionState: EditorCommands['saveSelectionState'];
    loadSelectionState: EditorCommands['loadSelectionState'];
    getDocStyle: EditorCommands['getDocStyle'];
    setDocStyle: EditorCommands['setDocStyle'];
  } = {
    getSelection: () => {
      const selection = getEditorState().getSelection();
      return { getIsCollapsed: selection.isCollapsed(), getIsFocused: selection.getHasFocus() };
    },
    getAnchorableBlocks: () => getAnchorableBlocks(getEditorState()),
    getColor: colorType => getColor(getEditorState(), colorType),
    getFontSize: () => getFontSize(getEditorState(), customStyles),
    getTextAlignment: () => getTextAlignment(getEditorState()),
    hasInlineStyle: style => hasInlineStyle(style, getEditorState()),
    isBlockTypeSelected: type => getBlockType(getEditorState()) === type,
    isUndoStackEmpty: () => getEditorState().getUndoStack().size === 0,
    isRedoStackEmpty: () => getEditorState().getRedoStack().size === 0,
    hasLinkInSelection: () => hasLinksInSelection(getEditorState()),
    getLinkDataInSelection: () => getLinkDataInSelection(getEditorState()),
    getSelectedData: () => getEntityData(getEditorState()) || {},
    getBlockSpacing: () => {
      const { dynamicStyles = {} } = getAnchorBlockData(getEditorState());
      return pick(dynamicStyles, ['line-height', 'padding-top', 'padding-bottom']);
    },
    saveEditorState: () => (savedEditorState = getEditorState()),
    loadEditorState: () => {
      const selection = savedEditorState.getSelection();
      setEditorState(EditorState.forceSelection(savedEditorState, selection));
    },
    saveSelectionState: () => (savedSelectionState = getEditorState().getSelection()),
    loadSelectionState: () =>
      setEditorState(EditorState.forceSelection(getEditorState(), savedSelectionState)),
    getPluginsList: settings => {
      const { isRicosSchema } = settings || {};
      const pluginsList = plugins?.map(plugin =>
        isRicosSchema ? TO_RICOS_PLUGIN_TYPE_MAP[plugin.blockType] : plugin.blockType
      );
      return pluginsList.filter(
        (pluginName: string) => pluginName && !PluginsToExclude.includes[pluginName]
      );
    },
    getDocStyle: () => getDocStyle(getEditorState()),
    setDocStyle: (docStyle: DocStyle) => {
      const newEditorState = setDocStyle(getEditorState(), docStyle);
      setEditorState(newEditorState);
    },
  };

  const textFormattingCommands: {
    undo: EditorCommands['undo'];
    redo: EditorCommands['redo'];
    toggleInlineStyle: EditorCommands['toggleInlineStyle'];
    setBlockType: EditorCommands['setBlockType'];
    setTextAlignment: EditorCommands['setTextAlignment'];
    _setSelection: EditorCommands['_setSelection'];
  } = {
    undo: () => setEditorState(undo(getEditorState())),
    redo: () => setEditorState(redo(getEditorState())),
    toggleInlineStyle: inlineStyle =>
      setEditorState(
        RichUtils.toggleInlineStyle(getEditorState(), getDraftInlineStyle(inlineStyle))
      ),
    setBlockType,
    setTextAlignment: textAlignment =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
    _setSelection,
  };

  const pluginsCommands: {
    insertBlock: EditorCommands['insertBlock'];
    setBlock: EditorCommands['setBlock'];
    deleteBlock: EditorCommands['deleteBlock'];
  } = {
    insertBlock: (type, data, settings) => {
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData(data, settings?.isRicosSchema);
      const { newBlock, newSelection, newEditorState } = createBlock(
        getEditorState(),
        pluginData,
        draftType
      );
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
      return newBlock.getKey();
    },
    setBlock: (blockKey, type, data, settings) => {
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData(data, settings?.isRicosSchema);
      const entityKey = blockKeyToEntityKey(getEditorState(), blockKey);
      const newEditorState = setEntityData(getEditorState(), entityKey, pluginData);
      const newSelection = newEditorState.getSelection();
      setEditorState(EditorState.forceSelection(newEditorState, newSelection));
    },
    deleteBlock: (blockKey: string) => setEditorState(deleteBlock(getEditorState(), blockKey)),
  };

  const decorationsCommands: {
    insertDecoration: EditorCommands['insertDecoration'];
    triggerDecoration: EditorCommands['triggerDecoration'];
    deleteDecoration: EditorCommands['deleteDecoration'];
  } = {
    insertDecoration: (type, data, settings) => {
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type as string];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData ? createPluginData(data, settings?.isRicosSchema) : data;
      const newEditorState = insertDecorationsMap[type]?.(getEditorState(), pluginData);
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
    triggerDecoration: type => {
      const newEditorState = triggerDecorationsMap[type as string]?.(getEditorState());
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
    deleteDecoration: type => {
      const newEditorState = deleteDecorationsMapFuncs[type]?.(getEditorState());
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
  };

  const editorCommands = {
    ...textFormattingCommands,
    ...pluginsCommands,
    ...decorationsCommands,
    ...editorState,
  };
  return editorCommands;
};
