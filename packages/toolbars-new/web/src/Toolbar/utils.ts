import {
  DROPDOWN_OPTIONS_TO_DOC_STYLE_TYPE,
  DocumentStyle,
  EditorCommands,
  DRAFT_TO_RICOS_DOC_TYPE,
} from 'wix-rich-content-common';

export const getFontSizeNumber = (fontSize: string) => {
  const pxRegex = new RegExp('[0-9]+[px]');
  return pxRegex.exec(fontSize) ? fontSize.split('p')[0] : '';
};

export const hasStyleChanges = (
  currentHeading: string,
  inlineStyles: Record<string, string>,
  documentStyle?: DocumentStyle
) => {
  const headerStyle = documentStyle?.[DROPDOWN_OPTIONS_TO_DOC_STYLE_TYPE[currentHeading]] || {};
  return Object.entries(inlineStyles).some(([key, value]) => headerStyle[key] !== value);
};

export const getBlockStyle = (editorCommands: EditorCommands) => {
  const blockType = editorCommands.getAnchorBlockType();
  const documentStyle = editorCommands.getDocumentStyle();
  return documentStyle?.[DRAFT_TO_RICOS_DOC_TYPE[blockType]];
};
