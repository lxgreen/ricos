/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-loops */
import React, { FC } from 'react';
import {
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  NUMBERED_LIST_TYPE,
  BULLET_LIST_TYPE,
  RICOS_INDENT_TYPE,
  RICOS_LINE_SPACING_TYPE,
  RICOS_FONT_SIZE_TYPE,
  RICOS_LINK_TYPE,
  InlineStyle,
  DecorationsDataMap,
  TextAlignment,
  ColorType,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
} from 'wix-rich-content-common';
import {
  BoldIcon,
  ItalicIcon,
  UnderlineIcon,
  BlockQuoteIcon,
  TitleIcon,
  TitleOneIcon,
  TitleTwoIcon,
  OrderedListIcon,
  UnorderedListIcon,
  LinkIcon,
  TextColorIcon,
  TextHighlightIcon,
  increaseIndentPluginIcon,
  decreaseIndentPluginIcon,
  SpoilerButtonIcon,
  LineSpacingIcon,
  CodeBlockIcon,
  EditIcon,
  TrashIcon,
  UndoIcon,
  RedoIcon,
  PlusIcon,
  AlignTextCenterIcon,
  AlignJustifyIcon,
  AlignLeftIcon,
  AlignRightIcon,
} from '../icons';
import LinkModal from '../modals/link/LinkComponents/LinkModal';
import AlignmentPanel from '../modals/alignment/AlignmentPanel';
import HeadingsPanel from '../modals/heading/HeadingsPanel';
import LineSpacingPanel from '../modals/line-spacing/LineSpacingPanel';
import FontSizePanel from '../modals/fontSize/FontSizePanel';

export const HEADING_TYPE_TO_ELEMENT = Object.freeze({
  'header-one': 'H1',
  'header-two': 'H2',
  'header-three': 'H3',
  'header-four': 'H4',
  'header-five': 'H5',
  'header-six': 'H6',
  unstyled: 'P',
});

export const alignmentsModalData = [
  {
    text: 'AlignTextLeftButton_Tooltip',
    tooltip: 'AlignTextLeftButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧L)',
      Windows: ' (Ctrl+⇧+L)',
    },
    commandKey: 'left',
    icon: AlignLeftIcon,
  },
  {
    text: 'AlignTextCenterButton_Tooltip',
    tooltip: 'AlignTextCenterButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧E)',
      Windows: ' (Ctrl+⇧+E)',
    },
    commandKey: 'center',
    icon: AlignTextCenterIcon,
  },
  {
    text: 'AlignTextRightButton_Tooltip',
    tooltip: 'AlignTextRightButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧R)',
      Windows: ' (Ctrl+⇧+R)',
    },
    commandKey: 'right',
    icon: AlignRightIcon,
  },
  {
    text: 'AlignTextJustifyButton_Tooltip',
    tooltip: 'AlignTextJustifyButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧J)',
      Windows: ' (Ctrl+⇧+J)',
    },
    commandKey: 'justify',
    icon: AlignJustifyIcon,
  },
];

export const lineSpacingModalData = [
  { text: '1', commandKey: '1' },
  { text: '1.5', commandKey: '1.5' },
  { text: '2', commandKey: '2' },
  { text: '2.5', commandKey: '2.5' },
  { text: '3', commandKey: '3' },
];

export const defaultLineSpacing = {
  'line-height': '1.5',
  'padding-top': '2px',
  'padding-bottom': '3px',
};

type buttonsFullDataType = {
  type: string;
  plugin?: string;
  icon?: any;
  dataHook?: string;
  tooltip?: string;
  tooltipShortcut?: Record<'MacOS' | 'Windows', string>;
  label?: string;
  arrow?: boolean;
  action?: string;
  modal?: (() => JSX.Element) | FC<any>;
  onSave?: string;
  saveState?: boolean;
  onCancel?: string;
  onChange?: string;
  onDone?: string;
  onDelete?: string;
  saveSelection?: boolean;
  loadSelection?: boolean;
  isMobileModalFullscreen?: boolean;
  colorPickerHeaderKey?: string;
  unstyled?: { icon: any; action: string };
  'header-two'?: { icon: any; action: string };
  'header-three'?: { icon: any; action: string };
  isInput?: boolean;
};

export const buttonsFullData: Record<string, buttonsFullDataType> = {
  AddPlugin: {
    icon: PlusIcon,
    dataHook: 'textInlineStyleButton_AddPlugin',
    tooltip: 'AddPlugin',
    type: 'button',
  },
  UNDO: {
    icon: UndoIcon,
    dataHook: 'textInlineStyleButton_UNDO',
    tooltip: 'UndoButton_Tooltip',
    type: 'button',
  },
  REDO: {
    icon: RedoIcon,
    dataHook: 'textInlineStyleButton_REDO',
    tooltip: 'RedoButton_Tooltip',
    type: 'button',
  },
  HEADINGS: {
    plugin: 'wix-rich-content-plugin-headings',
    icon: () => null,
    dataHook: 'headingsDropdownButton',
    tooltip: 'FormattingToolbar_TextStyleButton_Tooltip',
    label: 'HEADINGS',
    arrow: true,
    type: 'modal',
    modal: props => <HeadingsPanel {...props} translateHeading={translateHeading} />,
    onSave: 'HEADINGS',
    saveSelection: true,
    loadSelection: true,
  },
  FONT_SIZE: {
    icon: () => null,
    dataHook: 'customFontSizeButton',
    tooltip: 'FormattingToolbar_CustomFontSizeButton_Tooltip',
    arrow: true,
    type: 'modal',
    modal: props => <FontSizePanel {...props} />,
    onSave: 'FONT_SIZE',
    onChange: 'FONT_SIZE',
    label: 'FONT_SIZE',
    isInput: true,
    saveSelection: true,
    loadSelection: true,
  },
  Separator: {
    type: 'SEPARATOR',
  },
  Bold: {
    icon: BoldIcon,
    dataHook: 'textInlineStyleButton_BOLD',
    tooltip: 'BoldButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘B)',
      Windows: ' (Ctrl+B)',
    },
    type: 'button',
  },
  Italic: {
    icon: ItalicIcon,
    dataHook: 'textInlineStyleButton_ITALIC',
    tooltip: 'ItalicButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘I)',
      Windows: ' (Ctrl+I)',
    },
    type: 'button',
  },
  Underline: {
    icon: UnderlineIcon,
    dataHook: 'textInlineStyleButton_UNDERLINE',
    tooltip: 'UnderlineButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘U)',
      Windows: ' (Ctrl+U)',
    },
    type: 'button',
  },
  TEXT_COLOR: {
    plugin: 'wix-rich-content-text-color',
    icon: TextColorIcon,
    dataHook: 'TextColorButton',
    tooltip: 'TextColorButton_Tooltip',
    action: 'TEXT_COLOR',
    type: 'color-picker',
    saveSelection: true,
    loadSelection: true,
    colorPickerHeaderKey: 'Color_Picker_TextColorButton_Header',
  },
  TEXT_HIGHLIGHT: {
    plugin: 'wix-rich-content-text-highlight',
    icon: TextHighlightIcon,
    dataHook: 'TextHighlightButton',
    tooltip: 'TextHighlightButton_Tooltip',
    action: 'TEXT_HIGHLIGHT',
    type: 'color-picker',
    saveSelection: true,
    loadSelection: true,
    colorPickerHeaderKey: 'Color_Picker_TextHighlightButton_Header',
  },
  Title: {
    unstyled: {
      icon: TitleIcon,
      action: 'header-two',
    },
    'header-two': {
      icon: TitleOneIcon,
      action: 'header-three',
    },
    'header-three': {
      icon: TitleTwoIcon,
      action: 'unstyled',
    },
    dataHook: 'textBlockStyleButton_Title',
    tooltip: 'TitleButton_Tooltip',
    type: 'button',
  },
  Blockquote: {
    icon: BlockQuoteIcon,
    dataHook: 'textBlockStyleButton_Quote',
    tooltip: 'QuoteButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧9)',
      Windows: ' (Ctrl+⇧+9)',
    },
    type: 'button',
  },
  Alignment: {
    dataHook: 'Alignment',
    arrow: true,
    tooltip: 'AlignTextDropdownButton_Tooltip',
    type: 'modal',
    modal: props => <AlignmentPanel {...props} />,
    onSave: 'Alignment',
    saveSelection: true,
    loadSelection: true,
  },
  // Alignment: {
  //   dataHook: 'Alignment',
  //   tooltip: 'Alignment',
  //   type: 'GROUP',
  // },
  // AlignCenter: {
  //   icon: AlignTextCenterIcon,
  //   dataHook: 'textAlignmentButton_center',
  //   tooltip: 'Align center',
  //   type: 'button',
  // },
  // AlignLeft: {
  //   icon: AlignLeftIcon,
  //   dataHook: 'textAlignmentButton_left',
  //   tooltip: 'Align left',
  //   type: 'button',
  // },
  // AlignRight: {
  //   icon: AlignRightIcon,
  //   dataHook: 'textAlignmentButton_right',
  //   tooltip: 'Align right',
  //   type: 'button',
  // },
  // Justify: {
  //   icon: AlignJustifyIcon,
  //   dataHook: 'textAlignmentButton_justify',
  //   tooltip: 'Justify',
  //   type: 'button',
  // },
  OrderedList: {
    icon: OrderedListIcon,
    dataHook: 'textBlockStyleButton_NumberedList',
    tooltip: 'OrderedListButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧7)',
      Windows: ' (Ctrl+⇧+7)',
    },
    type: 'button',
  },
  UnorderedList: {
    icon: UnorderedListIcon,
    dataHook: 'textBlockStyleButton_BulletedList',
    tooltip: 'UnorderedListButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧8)',
      Windows: ' (Ctrl+⇧+8)',
    },
    type: 'button',
  },
  DECREASE_INDENT: {
    plugin: 'wix-rich-content-plugin-indent',
    icon: decreaseIndentPluginIcon,
    dataHook: 'decreaseIndentButton',
    tooltip: 'decreaseIndentButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘⇧M)',
      Windows: ' (Ctrl+⇧+M)',
    },
    type: 'button',
  },
  INCREASE_INDENT: {
    plugin: 'wix-rich-content-plugin-indent',
    icon: increaseIndentPluginIcon,
    dataHook: 'increaseIndentButton',
    tooltip: 'increaseIndentButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘M)',
      Windows: ' (Ctrl+M)',
    },
    type: 'button',
  },
  SPOILER: {
    plugin: 'wix-rich-content-plugin-spoiler',
    icon: SpoilerButtonIcon,
    dataHook: 'textSpoilerButton',
    tooltip: 'Spoiler_Insert_Tooltip',
    type: 'button',
  },
  LINE_SPACING: {
    plugin: 'line-spacing',
    icon: LineSpacingIcon,
    dataHook: 'LineSpacingButton',
    tooltip: 'LineSpacingButton_Tooltip',
    type: 'modal',
    modal: props => <LineSpacingPanel {...props} />,
    onSave: 'LINE_SPACING',
    arrow: true,
    saveState: true,
    onCancel: 'LINE_SPACING',
    onChange: 'LINE_SPACING',
    saveSelection: true,
    loadSelection: true,
  },
  LINK: {
    plugin: 'LINK',
    icon: LinkIcon,
    dataHook: 'LinkButton',
    tooltip: 'TextLinkButton_Tooltip',
    tooltipShortcut: {
      MacOS: ' (⌘K)',
      Windows: ' (Ctrl+K)',
    },
    type: 'modal',
    isMobileModalFullscreen: true,
    modal: props => <LinkModal {...props} />,
    onDone: 'LINK',
    onDelete: 'LINK',
    onCancel: 'LINK',
    saveSelection: true,
    loadSelection: true,
  },
  goToLink: {
    plugin: 'LINK',
    dataHook: 'GoToLinkButton',
    type: 'text',
  },
  editLink: {
    plugin: 'LINK',
    icon: EditIcon,
    dataHook: 'LinkButton',
    tooltip: 'LinkTo_Edit_Tooltip',
    type: 'modal',
    isMobileModalFullscreen: true,
    modal: props => <LinkModal {...props} isActive />,
    onDone: 'LINK',
    onDelete: 'LINK',
    onCancel: 'LINK',
    saveSelection: true,
    loadSelection: true,
  },
  removeLink: {
    icon: TrashIcon,
    plugin: 'LINK',
    dataHook: 'RemoveLinkButton',
    tooltip: 'LinkPanelContainer_RemoveButton',
    type: 'button',
  },
  CODE_BLOCK: {
    plugin: 'code-block',
    icon: CodeBlockIcon,
    dataHook: 'TextCodeBlockButton',
    tooltipShortcut: {
      MacOS: ' (⌘⇧C)',
      Windows: ' (Ctrl+⇧+C)',
    },
    tooltip: 'TextCodeBlockButton_Tooltip',
    type: 'button',
  },
};

export const inlineStyleButtons: Record<string, InlineStyle> = {
  Bold: 'bold',
  Italic: 'italic',
  Underline: 'underline',
  SPOILER: 'spoiler',
};

export const textBlockButtons: Record<string, string> = {
  CODE_BLOCK: CODE_BLOCK_TYPE,
  Blockquote: BLOCKQUOTE,
  OrderedList: NUMBERED_LIST_TYPE,
  UnorderedList: BULLET_LIST_TYPE,
  HEADINGS: 'HEADINGS',
};

export const decorationButtons: Record<string, keyof DecorationsDataMap> = {
  DECREASE_INDENT: RICOS_INDENT_TYPE,
  INCREASE_INDENT: RICOS_INDENT_TYPE,
  LINE_SPACING: RICOS_LINE_SPACING_TYPE,
  LINK: RICOS_LINK_TYPE,
  removeLink: RICOS_LINK_TYPE,
  editLink: RICOS_LINK_TYPE,
  FONT_SIZE: RICOS_FONT_SIZE_TYPE,
};

export const deleteDecorationButtons: Record<
  string,
  | typeof RICOS_FONT_SIZE_TYPE
  | typeof RICOS_TEXT_COLOR_TYPE
  | typeof RICOS_TEXT_HIGHLIGHT_TYPE
  | typeof RICOS_LINK_TYPE
> = {
  FONT_SIZE: RICOS_FONT_SIZE_TYPE,
  TEXT_COLOR: RICOS_TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT: RICOS_TEXT_HIGHLIGHT_TYPE,
  LINK: RICOS_LINK_TYPE,
};

export const setTextAlignment: Record<string, TextAlignment> = {
  AlignCenter: 'center',
  AlignLeft: 'left',
  AlignRight: 'right',
  Justify: 'justify',
};

export const colorTypes: Record<string, ColorType> = {
  TEXT_COLOR: RICOS_TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT: RICOS_TEXT_HIGHLIGHT_TYPE,
};

export const translateHeading = (option = 'P', t) => {
  return option === 'P'
    ? t('FormattingToolbar_TextStyle_Paragraph')
    : t('FormattingToolbar_TextStyle_Heading', { number: option.slice(-1) });
};

export const findOsName = () => {
  if (navigator.userAgent.indexOf('Win') !== -1) return 'Windows';
  if (navigator.userAgent.indexOf('Mac') !== -1) return 'MacOS';
  return null;
};

export const getSpacing = (currentSpacing, userDefaultSpacing) => {
  const hasCurrentSpacing = Object.keys(currentSpacing).length !== 0;
  const hasDefaultSpacing = Object.keys(userDefaultSpacing).length !== 0;
  const defaultSpacing = hasDefaultSpacing ? userDefaultSpacing : defaultLineSpacing;
  return hasCurrentSpacing ? currentSpacing : defaultSpacing;
};
