import {
  EditorState,
  ContentState,
  getSelectionStyles,
  getSelectedBlocks,
  hasOneStyleInSelection,
  setInlineStyle,
  removeCurrentInlineStyle,
  DraftOffsetKey,
} from 'wix-rich-content-editor-common';
import { uniq, cloneDeep } from 'lodash';
import { EditorProps } from 'draft-js';
import {
  RicosCustomStyles,
  safeJsonParse,
  DocStyle,
  DRAFT_TO_RICOS_DOC_TYPE,
} from 'wix-rich-content-common';

// Temporarily taken from common/statics/styles/consts.scss should replace with themed\docStyle consts when supported
const defaultFontSizes = {
  'header-one': '32px',
  'header-two': '28px',
  'header-three': '22px',
  'header-four': '1em',
  'header-five': '0.83em',
  'header-six': '0.67em',
  unstyled: '16px',
};

const draftToRicosCustomStyles = {
  'header-one': 'h1',
  'header-two': 'h2',
  'header-three': 'h3',
  'header-four': 'h4',
  'header-five': 'h5',
  'header-six': 'h6',
  unstyled: 'p',
};

const parseFontSize = style => {
  const cssRule = safeJsonParse(style);
  return cssRule?.['font-size'] ? cssRule : undefined;
};

export const customFontSizeStyleFn: EditorProps['customStyleFn'] = styles =>
  styles.toArray().reduce((cssStyle, style) => {
    return {
      ...cssStyle,
      ...parseFontSize(style),
    };
  }, {});

const getFontSizesWithDefaults = (editorState: EditorState) => {
  let currentFontSizes: string[] = getSelectionStyles(parseFontSize, editorState).map(
    style => parseFontSize(style)['font-size']
  );
  getSelectedBlocks(editorState)
    .filter(block => !hasOneStyleInSelection(block, editorState, parseFontSize))
    .forEach(block => {
      const offsetKey = DraftOffsetKey.encode(block.getKey(), 0, 0);
      const nodes = document.querySelectorAll(`[data-offset-key="${offsetKey}"]`);
      currentFontSizes = [
        ...currentFontSizes,
        ...Array.from(nodes).map(node =>
          window.getComputedStyle(node).getPropertyValue('font-size')
        ),
      ];
    });
  return currentFontSizes;
};

export const getFontSize = (editorState: EditorState) => {
  const currentFontSizes = uniq(getFontSizesWithDefaults(editorState));
  return currentFontSizes.length > 1 || currentFontSizes.length === 0 ? '' : currentFontSizes[0];
};

export const setFontSize = (editorState: EditorState, data?: { fontSize?: string }) => {
  let newEditorState = removeCurrentInlineStyle(editorState, parseFontSize);
  if (data?.fontSize) {
    const inlineStyle = JSON.stringify({ 'font-size': data?.fontSize + 'px' });
    newEditorState = setInlineStyle(newEditorState, inlineStyle);
  }
  return newEditorState;
};

export const getDocStyle = (
  editorState: EditorState,
  shouldIncludeDefaults = false,
  customStyles?: RicosCustomStyles
) => {
  const currentContent = editorState.getCurrentContent() as ContentState & {
    docStyle: DocStyle;
  };
  const docStyle = cloneDeep(currentContent.docStyle);
  if (shouldIncludeDefaults) {
    Object.entries(DRAFT_TO_RICOS_DOC_TYPE).forEach(([draftHeader, ricosHeader]) => {
      if (!docStyle[ricosHeader] || !docStyle[ricosHeader]['font-size']) {
        docStyle[ricosHeader] = {
          ...docStyle[ricosHeader],
          'font-size':
            customStyles?.[draftToRicosCustomStyles[draftHeader]]?.fontSize ||
            defaultFontSizes[draftHeader],
        };
      }
    });
  }
  return docStyle;
};

export const setDocStyle = (editorState: EditorState, docStyle: DocStyle) => {
  const currentContent = editorState.getCurrentContent() as ContentState & {
    docStyle: DocStyle;
  };
  currentContent.docStyle = {
    ...currentContent.docStyle,
    ...docStyle,
  };
  return editorState;
};
