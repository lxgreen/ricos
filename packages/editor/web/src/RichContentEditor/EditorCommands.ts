import { pick } from 'lodash';
import {
  EditorState,
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
  removeCurrentInlineStyle,
  isAtomicBlockInSelection,
  scrollToBlock,
  insertCustomLink,
} from 'wix-rich-content-editor-common';
import {
  AvailableExperiments,
  EditorCommands,
  GetEditorState,
  SetEditorState,
  RICOS_LINE_SPACING_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_LINK_TYPE,
  RICOS_MENTION_TYPE,
  RICOS_FONT_SIZE_TYPE,
  UNSUPPORTED_BLOCKS_TYPE,
  DocumentStyle,
  RicosCustomStyles,
  CUSTOM_LINK,
} from 'wix-rich-content-common';

import {
  getDocumentStyle,
  getWiredFontStyles,
  updateDocumentStyle,
  getAnchorBlockInlineStyles,
  setFontSize,
  getFontSize,
  getColor,
  setHighlightColor,
  setTextColor,
  toggleInlineStyle,
} from './utils/editorCommandsUtils';

import { TO_DRAFT_PLUGIN_TYPE_MAP, TO_RICOS_PLUGIN_TYPE_MAP } from 'ricos-content/libs/draftConsts';

export const PluginsToExclude = [UNSUPPORTED_BLOCKS_TYPE];

const triggerDecorationsMap = {
  [RICOS_MENTION_TYPE]: triggerMention,
};

const setFontSizeWithColor = (
  editorState: EditorState,
  data?: { fontSize?: string },
  getDocumentStyle?: unknown
) => {
  const highlightColor = getColor(editorState, RICOS_TEXT_HIGHLIGHT_TYPE);
  if (highlightColor !== undefined) {
    return setHighlightColor(setFontSize(setHighlightColor(editorState), data, getDocumentStyle), {
      color: highlightColor,
    });
  }
};

const insertDecorationsMap = {
  [RICOS_LINK_TYPE]: insertLinkAtCurrentSelection,
  [CUSTOM_LINK]: insertCustomLink,
  [RICOS_MENTION_TYPE]: insertMention,
  [RICOS_TEXT_COLOR_TYPE]: setTextColor,
  [RICOS_TEXT_HIGHLIGHT_TYPE]: setHighlightColor,
  [RICOS_FONT_SIZE_TYPE]: (
    editorState: EditorState,
    data?: { fontSize?: string },
    getDocumentStyle?: unknown
  ) => {
    const editorStateWithColor = setFontSizeWithColor(editorState, data, getDocumentStyle); // draft highlight <-> font size mismatch bug fix
    return editorStateWithColor || setFontSize(editorState, data, getDocumentStyle);
  },
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
  externalEditorProps,
  experiments?: AvailableExperiments
): EditorCommands => {
  const setBlockType: EditorCommands['setBlockType'] = type => {
    const editorState = getEditorState();
    getBlockType(editorState) !== type &&
      setEditorState(RichUtils.toggleBlockType(editorState, type));
  };

  const _setSelection: EditorCommands['_setSelection'] = (blockKey, selection) =>
    setEditorState(
      EditorState.forceSelection(
        getEditorState(),
        SelectionState.createEmpty(blockKey).merge(selection || {})
      )
    );

  const documentStyleGetter = externalEditorProps.getDocumentStyle
    ? externalEditorProps.getDocumentStyle
    : () => getDocumentStyle(getEditorState());

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
    scrollToBlock: EditorCommands['scrollToBlock'];
    isBlockInContent: EditorCommands['isBlockInContent'];
    getBlockSpacing: EditorCommands['getBlockSpacing'];
    saveEditorState: EditorCommands['saveEditorState'];
    loadEditorState: EditorCommands['loadEditorState'];
    saveSelectionState: EditorCommands['saveSelectionState'];
    loadSelectionState: EditorCommands['loadSelectionState'];
    getDocumentStyle: EditorCommands['getDocumentStyle'];
    updateDocumentStyle: EditorCommands['updateDocumentStyle'];
    getAnchorBlockInlineStyles: EditorCommands['getAnchorBlockInlineStyles'];
    getWiredFontStyles: EditorCommands['getWiredFontStyles'];
    isAtomicBlockInSelection: EditorCommands['isAtomicBlockInSelection'];
  } = {
    getSelection: () => {
      const selection = getEditorState().getSelection();
      return {
        isCollapsed: selection.isCollapsed(),
        isFocused: selection.getHasFocus(),
        startKey: selection.getStartKey(),
        endKey: selection.getEndKey(),
      };
    },
    getAnchorableBlocks: () => getAnchorableBlocks(getEditorState()),
    getColor: colorType => getColor(getEditorState(), colorType),
    getFontSize: () => getFontSize(getEditorState()),
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
    getDocumentStyle: () => documentStyleGetter(),
    updateDocumentStyle: (documentStyle: DocumentStyle) => {
      if (externalEditorProps.updateDocumentStyle) {
        externalEditorProps.updateDocumentStyle(documentStyle);
      } else {
        const newEditorState = updateDocumentStyle(getEditorState(), documentStyle);
        setEditorState(newEditorState);
      }
    },
    getAnchorBlockInlineStyles: () => getAnchorBlockInlineStyles(getEditorState()),
    getWiredFontStyles: (customStyles?: RicosCustomStyles, isMobile?: boolean) =>
      getWiredFontStyles(documentStyleGetter(), customStyles, isMobile),
    scrollToBlock: blockKey => scrollToBlock(blockKey, experiments),
    isBlockInContent: blockKey => {
      const blocks = getEditorState()
        .getCurrentContent()
        .getBlocksAsArray();
      return blocks.some(block => block.getKey() === blockKey);
    },
    isAtomicBlockInSelection: () => isAtomicBlockInSelection(getEditorState()),
  };

  const toggleOverlayBGColor = (element: HTMLElement) => {
    if (!element.style.backgroundColor) {
      element.style.backgroundColor = 'rgba(var(--ricos-text-color-tuple, 33, 33, 33), 0.1)';
    } else {
      element.style.backgroundColor = '';
    }
  };

  const textFormattingCommands: {
    undo: EditorCommands['undo'];
    redo: EditorCommands['redo'];
    toggleInlineStyle: EditorCommands['toggleInlineStyle'];
    setBlockType: EditorCommands['setBlockType'];
    setTextAlignment: EditorCommands['setTextAlignment'];
    _setSelection: EditorCommands['_setSelection'];
    toggleBlockOverlay: EditorCommands['toggleBlockOverlay'];
  } = {
    undo: () => setEditorState(undo(getEditorState())),
    redo: () => setEditorState(redo(getEditorState())),
    toggleInlineStyle: inlineStyle =>
      setEditorState(toggleInlineStyle(getEditorState(), inlineStyle, documentStyleGetter)),
    setBlockType,
    setTextAlignment: textAlignment =>
      setEditorState(setTextAlignment(getEditorState(), textAlignment)),
    _setSelection,
    toggleBlockOverlay: blockKey => {
      const blockElement = document.querySelector(`[data-offset-key="${blockKey}-0-0"]`);
      const elementOverlay = blockElement?.querySelector(`[data-hook="componentOverlay"]`);
      const element = elementOverlay
        ? blockElement?.querySelector(`[data-hook="componentOverlay"]`)
        : blockElement;
      toggleOverlayBGColor(element as HTMLElement);
    },
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
    clearSelectedBlocksInlineStyles: EditorCommands['clearSelectedBlocksInlineStyles'];
  } = {
    insertDecoration: (type: string, data, settings) => {
      const draftType = TO_DRAFT_PLUGIN_TYPE_MAP[type];
      const { [draftType]: createPluginData } = createPluginsDataMap;
      const pluginData = createPluginData ? createPluginData(data, settings?.isRicosSchema) : data;
      const newEditorState = insertDecorationsMap[type]?.(
        getEditorState(),
        pluginData,
        documentStyleGetter
      );
      if (newEditorState) {
        setEditorState(newEditorState);
      }
    },
    triggerDecoration: (type: string) => {
      const newEditorState = triggerDecorationsMap[type]?.(getEditorState());
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
    clearSelectedBlocksInlineStyles: (exclude?: string[]) => {
      const styleSelectionPredicate = style => !exclude?.includes(style);
      setEditorState(removeCurrentInlineStyle(getEditorState(), styleSelectionPredicate));
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
