import React from 'react';
import {
  DROPDOWN_OPTIONS_TO_DOC_STYLE_TYPE,
  DocumentStyle,
  normalizeUrl,
  EditorCommands,
  DRAFT_TO_RICOS_DOC_TYPE,
} from 'wix-rich-content-common';
import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';
import { scrollToBlock } from 'wix-rich-content-editor-common';
import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons';
import {
  decorationButtons,
  HEADING_TYPE_TO_ELEMENT,
  HEADING_TYPE_TO_ICON,
  setTextAlignment,
  translateHeading,
} from './buttonsListCreatorConsts';
import style from './ToolbarButtonNew.scss';

type editorCommands = EditorCommands;

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

export const handleLinkSettings = linkSettings => {
  const { anchorTarget = '_blank', customAnchorScroll } = linkSettings;
  let { relValue, rel } = linkSettings;
  if (relValue) {
    // eslint-disable-next-line no-console
    console.warn(
      // eslint-disable-next-line max-len
      `relValue is deprecated, Please use rel prop instead.`
    );
    rel = convertRelStringToObject(relValue) || rel;
  }
  relValue = convertRelObjectToString(rel);
  return { relValue, anchorTarget, customAnchorScroll };
};

export const goToLink = (event, linkData, linkPanelData, experiments) => {
  const { anchor, url, target } = linkData;
  if (anchor) {
    const { customAnchorScroll } = linkPanelData;
    if (customAnchorScroll) {
      customAnchorScroll(event, anchor);
    } else {
      scrollToBlock(anchor, experiments);
    }
  } else {
    const href = url ? normalizeUrl(url) : undefined;
    window.open(href, target);
  }
};

export const updateDynamicStyles = (value, editorCommands: editorCommands, buttonName) => {
  const data =
    buttonName === 'FONT_SIZE'
      ? { fontSize: value < 1 ? 1 : value > 900 ? 900 : value }
      : { dynamicStyles: value };
  editorCommands.insertDecoration(decorationButtons[buttonName], { ...data });
};

export const getHeadingIcon = (editorCommands: editorCommands) => {
  const currentHeading = getCurrentHeading(editorCommands);
  return HEADING_TYPE_TO_ICON[currentHeading];
};

export const getCurrentHeading = (editorCommands: editorCommands) => {
  let currentHeading = 'P';
  Object.keys(HEADING_TYPE_TO_ELEMENT).forEach(headingType => {
    if (editorCommands.isBlockTypeSelected(headingType)) {
      currentHeading = HEADING_TYPE_TO_ELEMENT[headingType];
    }
  });
  return currentHeading;
};

export const handleAlignmentIcon = editorCommands => {
  const currentAlignment = editorCommands.getTextAlignment();
  let alignmentIcon;
  switch (currentAlignment) {
    case setTextAlignment.AlignCenter:
      alignmentIcon = AlignTextCenterIcon;
      break;
    case setTextAlignment.AlignRight:
      alignmentIcon = AlignRightIcon;
      break;
    case setTextAlignment.Justify:
      alignmentIcon = AlignJustifyIcon;
      break;
    default:
      alignmentIcon = AlignLeftIcon;
      break;
  }
  return alignmentIcon;
};

export const getHeadingsLabel = (editorCommands: editorCommands, t, headingsData) => {
  const currentHeading = getCurrentHeading(editorCommands);
  let label = translateHeading(currentHeading, t);
  const inlineStyles = editorCommands.getAnchorBlockInlineStyles() || {};
  if (
    headingsData.allowHeadingCustomization &&
    hasStyleChanges(currentHeading, inlineStyles, editorCommands.getDocumentStyle())
  ) {
    label = (
      <>
        {label}
        <span className={style.toolbarLabelUpdate}>*</span>
      </>
    );
  }
  return label;
};

export const getFontSize = (editorCommands: editorCommands) => {
  const fontSize = editorCommands.getFontSize() || '';
  return getFontSizeNumber(fontSize);
};
