/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-loops */
import React from 'react';
import { merge, cloneDeep } from 'lodash';
import { scrollToBlock } from 'wix-rich-content-editor-common';
import {
  RICOS_LINK_TYPE,
  EditorCommands,
  normalizeUrl,
  CUSTOM_LINK,
  SPOILER_TYPE,
  TranslationFunction,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons';
import {
  HEADING_TYPE_TO_ELEMENT,
  HEADING_TYPE_TO_ICON,
  buttonsFullData,
  inlineStyleButtons,
  textBlockButtons,
  decorationButtons,
  setTextAlignment,
  colorTypes,
  translateHeading,
  findOsName,
  getSpacing,
  documentStyleCssProperties,
  inlineOverrideStyles,
} from './buttonsListCreatorConsts';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';
import { RicosTheme } from 'ricos-common';
import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';
import { getFontSizeNumber, hasStyleChanges, getBlockStyle } from './utils';
import style from './ToolbarButtonNew.scss';
import { linkPanelDataType, defaultLineSpacingType } from './RicosToolbar';

type editorCommands = EditorCommands;

export const createButtonsList = ({
  buttons,
  editorCommands,
  t,
  linkPanelData,
  colorPickerData,
  headingsData,
  defaultLineSpacing,
  experiments,
  theme,
  configButtonsMapper,
}: {
  buttons: any;
  editorCommands: editorCommands;
  t: TranslationFunction;
  linkPanelData?: linkPanelDataType;
  colorPickerData: any;
  headingsData: any;
  defaultLineSpacing?: defaultLineSpacingType;
  experiments?: AvailableExperiments;
  theme?: RicosTheme;
  configButtonsMapper: any;
}) => {
  const buttonsMapper = cloneDeep(buttonsFullData);
  merge(buttonsMapper, configButtonsMapper);
  const buttonsList: any[] = [];
  const osName: string | null = findOsName();
  buttons.forEach((buttonKey, index) => {
    if (buttonKey?.type === 'component') {
      buttonsList.push(buttonKey);
    } else {
      handleButtonName(buttonsList, buttonKey, index);
      handleButtonType(buttonsList, index, buttonsMapper);
      handleButtonIcon(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonDataHook(buttonsList, index, buttonsMapper);
      handleButtIsMobileModalFullscreen(buttonsList, index, buttonsMapper);
      handleButtonTooltip(buttonsList, index, t, osName, buttonsMapper);
      handleButtonPlugin(buttonsList, index, buttonsMapper);
      handleButtonLabel(buttonsList, index, editorCommands, t, headingsData, buttonsMapper);
      handleButtonArrow(buttonsList, index, buttonsMapper);
      handleUseIconOnMobile(buttonsList, index, buttonsMapper);
      handleButtonOnClick(buttonsList, index, editorCommands, linkPanelData, experiments);
      handleButtonIsActive(buttonsList, index, editorCommands);
      handleButtonIsDisabled(buttonsList, index, editorCommands);
      handleButtonModal(
        buttonsList,
        index,
        editorCommands,
        linkPanelData,
        headingsData,
        t,
        defaultLineSpacing,
        theme,
        buttonsMapper
      );
      handleButtonOnSave(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonOnCancel(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonOnChange(buttonsList, index, editorCommands, headingsData, buttonsMapper);
      handleButtonOnDone(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonOnDelete(buttonsList, index, editorCommands, buttonsMapper);
      // handleGroupButtons(buttonsList, buttonKey, index, editorCommands);
      buttonKey === 'Title' && handleTitleButton(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonSaveState(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonSaveSelection(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonLoadSelection(buttonsList, index, editorCommands, buttonsMapper);
      handleButtonColorPicker(buttonsList, index, editorCommands, colorPickerData, buttonsMapper);
      handleButtonText(buttonsList, index, editorCommands, t);
      handleButtonIsInput(buttonsList, index, buttonsMapper);
      handleButtonCloseOnChange(buttonsList, index, buttonsMapper);
    }
  });
  return buttonsList;
};

const handleButtonIsInput = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].isInput) {
    buttonsList[index].isInput = buttonsMapper[buttonsList[index].name].isInput;
  }
};

const handleButtonCloseOnChange = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].closeOnChange) {
    buttonsList[index].closeOnChange = buttonsMapper[buttonsList[index].name].closeOnChange;
  }
};

const handleButtonText = (buttonsList, index, editorCommands: editorCommands, t) => {
  if (buttonsList[index].name === 'goToLink') {
    const linkData = editorCommands.getLinkDataInSelection();
    buttonsList[index].text = linkData?.url || t('LinkTo_Toolbar_GoTo');
    buttonsList[index].asLink = true;
  }
};

const handleButtonColorPicker = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  colorPickerData,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].type === 'color-picker') {
    const buttonName = buttonsList[index].name;
    const blockStyle = getBlockStyle(editorCommands);
    buttonsList[index].getCurrentColor = () =>
      editorCommands.getColor(colorTypes[buttonName]) ||
      blockStyle?.[documentStyleCssProperties[buttonName]];
    buttonsList[index].onColorAdded = color => colorPickerData[buttonName]?.onColorAdded?.(color);
    buttonsList[index].onChange = color => {
      editorCommands.insertDecoration(colorTypes[buttonName], { color });
    };
    buttonsList[index].settings = colorPickerData[buttonName] || {};
    buttonsList[index].defaultPalette = Object.freeze([
      '#ff0000',
      '#ffffff',
      '#303030',
      '#3a54b4',
      '#bfad80',
      '#dddddd',
    ]);
    buttonsList[index].getUserColors = () => colorPickerData[buttonName]?.getUserColors?.();
    buttonsList[index].getDefaultColors = () =>
      colorPickerData[buttonName]?.getDefaultColors?.() ||
      Object.freeze(['#ff0000', '#ffffff', '#303030', '#3a54b4', '#bfad80', '#dddddd']);
    buttonsList[index].onResetColor = () => {
      editorCommands.insertDecoration(colorTypes[buttonName]);
    };
    buttonsList[index].colorPickerHeaderKey = buttonsMapper[buttonName].colorPickerHeaderKey;
    buttonsList[index].withColoredIcon = true;
  }
};

const handleButtonOnDelete = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].onDelete) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK' || buttonName === 'editLink') {
      buttonsList[index].onDelete = () => {
        editorCommands.deleteDecoration(decorationButtons[buttonName] as typeof RICOS_LINK_TYPE);
      };
    }
  }
};

const handleButtonOnDone = (buttonsList, index, editorCommands: editorCommands, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].onDone) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK' || buttonName === 'editLink') {
      buttonsList[index].onDone = data => {
        editorCommands.insertDecoration(decorationButtons[buttonName], data);
      };
    }
  }
};

const handleButtonOnChange = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  headingsData,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].onChange) {
    const buttonName = buttonsList[index].name;
    if (['LINE_SPACING', 'FONT_SIZE'].includes(buttonName)) {
      buttonsList[index].onChange = value => {
        updateDynamicStyles(value, editorCommands, buttonName);
      };
    } else if (buttonName === 'HEADINGS' && headingsData.allowHeadingCustomization) {
      buttonsList[index].onChange = documentStyle => {
        editorCommands.clearSelectedBlocksInlineStyles(['UNDERLINE', SPOILER_TYPE]);
        setTimeout(() => editorCommands.updateDocumentStyle(documentStyle));
      };
    }
  }
};

const handleButtonOnCancel = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].onCancel) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINE_SPACING') {
      buttonsList[index].onCancel = () => editorCommands.loadEditorState();
    }
  }
};

const handleButtonSaveState = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].saveState) {
    buttonsList[index].saveState = () => {
      editorCommands.saveSelectionState();
      editorCommands.saveEditorState();
    };
  }
};

const handleButtonLoadSelection = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].loadSelection) {
    buttonsList[index].loadSelection = () => {
      setTimeout(() => editorCommands.loadSelectionState());
    };
  }
};

const handleButtonSaveSelection = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  buttonsMapper
) => {
  if (buttonsMapper[buttonsList[index].name].saveSelection) {
    buttonsList[index].saveSelection = () => {
      editorCommands.saveSelectionState();
    };
  }
};

const handleTitleButton = (buttonsList, index, editorCommands: editorCommands, buttonsMapper) => {
  const currentHeading = getCurrentHeading(editorCommands);
  let headingKey;
  switch (currentHeading) {
    case 'H2':
      headingKey = 'header-two';
      break;
    case 'H3':
      headingKey = 'header-three';
      break;
    default:
      headingKey = 'unstyled';
      break;
  }
  buttonsList[index].getIcon = () => buttonsMapper[buttonsList[index].name][headingKey].icon;
  buttonsList[index].onClick = () =>
    editorCommands.setBlockType(buttonsMapper[buttonsList[index].name][headingKey].action);
  buttonsList[index].isActive = () => headingKey === 'header-three' || headingKey === 'header-two';
};

const handleButtonOnSave = (buttonsList, index, editorCommands: editorCommands, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].onSave) {
    const buttonName = buttonsList[index].name;
    if (Object.keys(textBlockButtons).includes(buttonName)) {
      buttonsList[index].onSave = type => {
        let shouldSetBlockType = true;
        if (buttonName === 'HEADINGS') {
          editorCommands.clearSelectedBlocksInlineStyles();
          const currentHeading = HEADER_TYPE_MAP[getCurrentHeading(editorCommands)];
          shouldSetBlockType = currentHeading !== type;
        }
        shouldSetBlockType &&
          setTimeout(() => {
            editorCommands.setBlockType(type);
          });
      };
    } else if (buttonName === 'Alignment') {
      buttonsList[index].onSave = type => editorCommands.setTextAlignment(type);
    } else if (Object.keys(decorationButtons).includes(buttonName)) {
      buttonsList[index].onSave = value => {
        if (['LINE_SPACING', 'FONT_SIZE'].includes(buttonName)) {
          if (value) {
            updateDynamicStyles(value, editorCommands, buttonName);
          }
        }
      };
    }
  }
};

const handleButtonModal = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  linkPanelData,
  headingsData,
  t,
  defaultLineSpacing,
  theme,
  buttonsMapper
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsMapper[buttonName].modal) {
    buttonsList[index].modal = buttonsMapper[buttonName].modal;
    if (buttonName === 'HEADINGS') {
      const Modal = buttonsMapper[buttonName].modal;
      const currentHeading = HEADER_TYPE_MAP[getCurrentHeading(editorCommands)];
      const documentStyle = editorCommands.getDocumentStyle();
      buttonsList[index].modal = props =>
        Modal && (
          <Modal
            {...props}
            currentSelect={currentHeading}
            documentStyle={documentStyle}
            customHeadings={headingsData?.customHeadings}
            allowHeadingCustomization={headingsData?.allowHeadingCustomization}
            currentInlineStyles={editorCommands.getAnchorBlockInlineStyles()}
            wiredFontStyles={editorCommands.getWiredFontStyles(theme?.customStyles, props.isMobile)}
            t={t}
          />
        );
    } else if (buttonName === 'Alignment') {
      const alignment = editorCommands.getTextAlignment();
      const Modal = buttonsMapper[buttonName].modal;
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={alignment} />;
    } else if (buttonName === 'LINE_SPACING') {
      const Modal = buttonsMapper[buttonName].modal;
      const currentSpacing = editorCommands.getBlockSpacing();
      const spacing = getSpacing(currentSpacing, defaultLineSpacing);
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={spacing} />;
    } else if (buttonName === 'LINK' || buttonName === 'editLink') {
      const { onLinkAdd, linkSettings = {}, ...rest } = linkPanelData;
      const linkData = editorCommands.getLinkDataInSelection();
      const isCustomLinkHandling = !!onLinkAdd;
      if (isCustomLinkHandling) {
        const customLinkData = linkData?.customData;
        const callback = data => editorCommands.insertDecoration(CUSTOM_LINK, data);
        buttonsList[index].type = 'button';
        buttonsList[index].onClick = () => onLinkAdd(customLinkData, callback);
      } else {
        const Modal = buttonsMapper[buttonName].modal;
        const anchorableBlocks = editorCommands.getAnchorableBlocks();
        const linkSettingsData = handleLinkSettings(linkSettings);
        buttonsList[index].modal = props =>
          Modal && (
            <Modal
              {...props}
              {...rest}
              {...linkSettingsData}
              {...linkData}
              t={t}
              anchorableBlocksData={anchorableBlocks}
              isMobileModalFullscreen
            />
          );
      }
    } else if (buttonName === 'FONT_SIZE') {
      const Modal = buttonsMapper[buttonName].modal;
      buttonsList[index].modal = props =>
        Modal && <Modal {...props} currentSelect={getFontSize(editorCommands)} t={t} />;
    }
  }
};

const handleButtonIsDisabled = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (buttonName === 'UNDO') {
    buttonsList[index].isDisabled = () => editorCommands.isUndoStackEmpty();
  } else if (buttonName === 'REDO') {
    buttonsList[index].isDisabled = () => editorCommands.isRedoStackEmpty();
  } else if (buttonName === 'LINK') {
    buttonsList[index].isDisabled = () => editorCommands.isAtomicBlockInSelection();
  } else {
    buttonsList[index].isDisabled = () => false;
  }
};

const handleButtonIsActive = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (Object.keys(inlineStyleButtons).includes(buttonName)) {
    buttonsList[index].isActive = () => {
      const blockStyle = getBlockStyle(editorCommands);
      const property = documentStyleCssProperties[buttonName];
      return (
        editorCommands.hasInlineStyle(inlineStyleButtons[buttonName]) ||
        (blockStyle?.[property] &&
          blockStyle[property] === inlineStyleButtons[buttonName] &&
          !editorCommands.hasInlineStyle(inlineOverrideStyles[buttonName]))
      );
    };
  } else if (Object.keys(textBlockButtons).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.isBlockTypeSelected(textBlockButtons[buttonName]);
  } else if (Object.keys(setTextAlignment).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.getTextAlignment() === setTextAlignment[buttonName];
  } else if (buttonName === 'LINK') {
    buttonsList[index].isActive = () => editorCommands.hasLinkInSelection();
  } else if (Object.keys(colorTypes).includes(buttonName)) {
    buttonsList[index].isActive = () =>
      editorCommands.getColor(colorTypes[buttonName]) !== undefined;
  } else if (buttonName === 'AddPlugin') {
    buttonsList[index].isActive = () => false;
    buttonsList[index].iconInActionColor = true;
  } else {
    buttonsList[index].isActive = () => false;
  }
};

const handleButtonOnClick = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  linkPanelData,
  experiments
) => {
  const buttonName = buttonsList[index].name;
  if (Object.keys(inlineStyleButtons).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.toggleInlineStyle(inlineStyleButtons[buttonName]);
  } else if (Object.keys(textBlockButtons).includes(buttonName)) {
    buttonsList[index].onClick = () => editorCommands.setBlockType(textBlockButtons[buttonName]);
  } else if (Object.keys(setTextAlignment).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.setTextAlignment(setTextAlignment[buttonName]);
  } else if (Object.keys(decorationButtons).includes(buttonName)) {
    if (buttonName === 'DECREASE_INDENT') {
      buttonsList[index].onClick = () =>
        editorCommands.insertDecoration(decorationButtons[buttonName], -1);
    } else if (buttonName === 'INCREASE_INDENT') {
      buttonsList[index].onClick = () =>
        editorCommands.insertDecoration(decorationButtons[buttonName], 1);
    } else if (buttonName === 'removeLink') {
      buttonsList[index].onClick = () =>
        editorCommands.deleteDecoration(decorationButtons[buttonName] as typeof RICOS_LINK_TYPE);
    }
  } else if (buttonName === 'UNDO') {
    buttonsList[index].onClick = () => editorCommands.undo();
  } else if (buttonName === 'REDO') {
    buttonsList[index].onClick = () => editorCommands.redo();
  } else if (buttonName === 'goToLink') {
    buttonsList[index].onClick = event =>
      goToLink(event, editorCommands.getLinkDataInSelection(), linkPanelData, experiments);
  } else if (buttonName === 'AddPlugin') {
    buttonsList[index].onClick = () => {
      const addPluginButton = document.querySelector(
        '[data-hook=addPluginFloatingToolbar]'
      ) as HTMLElement;
      addPluginButton?.click();
    };
  } else {
    // eslint-disable-next-line no-console
    buttonsList[index].onClick = () => console.log('click');
  }
};

const handleButtonArrow = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].arrow) {
    buttonsList[index].arrow = buttonsMapper[buttonsList[index].name].arrow;
  }
};

const handleUseIconOnMobile = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].useIconOnMobile) {
    buttonsList[index].useIconOnMobile = buttonsMapper[buttonsList[index].name].useIconOnMobile;
  }
};

const getFontSize = (editorCommands: editorCommands) => {
  const fontSize = editorCommands.getFontSize() || '';
  return getFontSizeNumber(fontSize);
};

const getHeadingsLabel = (editorCommands: editorCommands, t, headingsData) => {
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

const handleButtonLabel = (
  buttonsList,
  index,
  editorCommands: editorCommands,
  t,
  headingsData,
  buttonsMapper
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsMapper[buttonName].label) {
    buttonsList[index].getLabel = () => buttonsMapper[buttonName].label;
    if (buttonName === 'HEADINGS') {
      buttonsList[index].getLabel = () => getHeadingsLabel(editorCommands, t, headingsData);
    } else if (buttonName === 'FONT_SIZE') {
      buttonsList[index].getLabel = () => getFontSize(editorCommands);
    }
  }
};

const handleButtonTooltip = (buttonsList, index, t, osName, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].tooltip) {
    const tooltipShortcut = buttonsMapper[buttonsList[index].name].tooltipShortcut;
    buttonsList[index].tooltip = t(
      buttonsMapper[buttonsList[index].name].tooltip,
      tooltipShortcut &&
        osName && {
          shortcut: tooltipShortcut[osName],
        }
    );
  }
};

const handleButtonPlugin = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].plugin) {
    buttonsList[index].plugin = buttonsMapper[buttonsList[index].name].plugin;
  }
};

const handleButtonDataHook = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].dataHook) {
    buttonsList[index].dataHook = buttonsMapper[buttonsList[index].name].dataHook;
  }
};

const handleButtIsMobileModalFullscreen = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name].isMobileModalFullscreen) {
    buttonsList[index].isMobileModalFullscreen =
      buttonsMapper[buttonsList[index].name].isMobileModalFullscreen;
  }
};

const handleButtonIcon = (buttonsList, index, editorCommands: editorCommands, buttonsMapper) => {
  const buttonName = buttonsList[index].name;
  if (buttonsMapper[buttonName].icon) {
    buttonsList[index].getIcon = () => buttonsMapper[buttonsList[index].name].icon;
  } else if (buttonName === 'Alignment') {
    buttonsList[index].getIcon = () => handleAlignmentIcon(editorCommands);
  } else if (buttonName === 'HEADINGS') {
    buttonsList[index].getIcon = () => getHeadingIcon(editorCommands);
  }
};

const handleAlignmentIcon = editorCommands => {
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

const handleButtonType = (buttonsList, index, buttonsMapper) => {
  if (buttonsMapper[buttonsList[index].name]?.type) {
    buttonsList[index].type = buttonsMapper[buttonsList[index].name].type;
  } else {
    console.error(
      `${buttonsList[index].name} button not found (need to be declared in buttonsListCreatorConsts.tsx)`
    );
  }
};

const handleButtonName = (buttonsList, buttonKey, index) => {
  if (buttonKey === '|') {
    buttonsList[index] = { name: 'Separator' };
    // } else if (typeof buttonKey !== 'string') {
    //   //grouped buttons
    //   buttonsList[index] = { name: buttonKey.name };
  } else {
    buttonsList[index] = { name: buttonKey };
  }
};

// const handleGroupButtons = (buttonsList, buttonKey, index, editorCommands: editorCommands) => {
//   if (buttonKey.buttons) {
//     buttonsList[index].buttonList = {};
//     buttonKey.buttons.forEach(innerButtonKey => {
//       buttonsList[index].buttonList[innerButtonKey] = { name: innerButtonKey };
//       addGroupButtonsData(buttonsList, index, innerButtonKey, editorCommands);
//     });
//   }
// };

// const addGroupButtonsData = (
//   buttonsList,
//   index,
//   innerButtonKey,
//   editorCommands: editorCommands
// ) => {
//   const currentInnerButton = buttonsList[index].buttonList[innerButtonKey];
//   if (buttonsFullData[innerButtonKey].type) {
//     currentInnerButton.type = buttonsFullData[innerButtonKey].type;
//   }
//   if (buttonsFullData[innerButtonKey].icon) {
//     currentInnerButton.getIcon = () => buttonsFullData[innerButtonKey].icon;
//   }
//   if (buttonsFullData[innerButtonKey].dataHook) {
//     currentInnerButton.dataHook = buttonsFullData[innerButtonKey].dataHook;
//   }
//   if (buttonsFullData[innerButtonKey].tooltip) {
//     currentInnerButton.tooltip = buttonsFullData[innerButtonKey].tooltip;
//   }
//   //TODO: check type of button (Alignment)
//   currentInnerButton.onClick = () =>
//     editorCommands.setTextAlignment(setTextAlignment[innerButtonKey]);
//   currentInnerButton.isActive = () =>
//     editorCommands.getTextAlignment() === buttonsFullData[innerButtonKey].action;
//   currentInnerButton.isDisabled = () => false;
// };

const getCurrentHeading = (editorCommands: editorCommands) => {
  let currentHeading = 'P';
  Object.keys(HEADING_TYPE_TO_ELEMENT).forEach(headingType => {
    if (editorCommands.isBlockTypeSelected(headingType)) {
      currentHeading = HEADING_TYPE_TO_ELEMENT[headingType];
    }
  });
  return currentHeading;
};

const getHeadingIcon = (editorCommands: editorCommands) => {
  const currentHeading = getCurrentHeading(editorCommands);
  return HEADING_TYPE_TO_ICON[currentHeading];
};

const updateDynamicStyles = (value, editorCommands: editorCommands, buttonName) => {
  const data =
    buttonName === 'FONT_SIZE'
      ? { fontSize: value < 1 ? 1 : value > 900 ? 900 : value }
      : { dynamicStyles: value };
  editorCommands.insertDecoration(decorationButtons[buttonName], { ...data });
};

const goToLink = (event, linkData, linkPanelData, experiments) => {
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

const handleLinkSettings = linkSettings => {
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
