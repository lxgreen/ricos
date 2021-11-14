/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable fp/no-loops */
import React from 'react';
import {
  RICOS_LINK_TYPE,
  EditorCommands,
  normalizeUrl,
  anchorScroll,
  IMAGE_TYPE,
  GALLERY_TYPE,
  FILE_UPLOAD_TYPE,
  CUSTOM_LINK,
} from 'wix-rich-content-common';
import { AlignTextCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRightIcon } from '../icons';
import {
  HEADING_TYPE_TO_ELEMENT,
  buttonsFullData,
  inlineStyleButtons,
  textBlockButtons,
  decorationButtons,
  setTextAlignment,
  colorTypes,
  translateHeading,
  findOsName,
  insertBlockButtons,
  fileUploadButtons,
  getSpacing,
} from './buttonsListCreatorConsts';
import { HEADER_TYPE_MAP } from 'wix-rich-content-plugin-commons';
import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';
import {
  imageTempData,
  imageData,
  galleryTempData,
  galleryData,
  fileTempData,
  fileData,
} from './mockData';

type editorCommands = EditorCommands;

const shouldBehaveLikeNativeApp = true;

export const createButtonsList = (
  formattingButtonsKeys,
  editorCommands: editorCommands,
  t,
  linkPanelData,
  colorPickerData,
  headingsData,
  defaultLineSpacing,
  experiments,
  theme,
  handleFileUpload
) => {
  // eslint-disable-next-line no-console
  console.log({ theme });
  const buttonsList: any[] = [];
  const osName: string | null = findOsName();
  formattingButtonsKeys.forEach((buttonKey, index) => {
    if (buttonKey?.type === 'component') {
      buttonsList.push(buttonKey);
    } else {
      handleButtonName(buttonsList, buttonKey, index);
      handleButtonType(buttonsList, index);
      handleButtonIcon(buttonsList, index, editorCommands);
      handleButtonDataHook(buttonsList, index);
      handleButtIsMobileModalFullscreen(buttonsList, index);
      handleButtonTooltip(buttonsList, index, t, osName);
      handleButtonPlugin(buttonsList, index);
      handleButtonLabel(buttonsList, index, editorCommands, t);
      handleButtonArrow(buttonsList, index);
      handleButtonOnClick(
        buttonsList,
        index,
        editorCommands,
        linkPanelData,
        experiments,
        handleFileUpload
      );
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
        handleFileUpload
      );
      handleButtonOnSave(buttonsList, index, editorCommands);
      handleButtonOnCancel(buttonsList, index, editorCommands);
      handleButtonOnChange(buttonsList, index, editorCommands);
      handleButtonOnDone(buttonsList, index, editorCommands);
      handleButtonOnDelete(buttonsList, index, editorCommands);
      // handleGroupButtons(buttonsList, buttonKey, index, editorCommands);
      buttonKey === 'Title' && handleTitleButton(buttonsList, index, editorCommands);
      handleButtonSaveState(buttonsList, index, editorCommands);
      handleButtonSaveSelection(buttonsList, index, editorCommands);
      handleButtonLoadSelection(buttonsList, index, editorCommands);
      handleButtonColorPicker(buttonsList, index, editorCommands, colorPickerData);
      handleButtonText(buttonsList, index, editorCommands, t);
      handleButtonIsInput(buttonsList, index);
    }
  });
  return buttonsList;
};

const handleButtonIsInput = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].isInput) {
    buttonsList[index].isInput = buttonsFullData[buttonsList[index].name].isInput;
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
  colorPickerData
) => {
  if (buttonsFullData[buttonsList[index].name].type === 'color-picker') {
    const buttonName = buttonsList[index].name;
    buttonsList[index].getCurrentColor = () => editorCommands.getColor(colorTypes[buttonName]);
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
    buttonsList[index].colorPickerHeaderKey = buttonsFullData[buttonName].colorPickerHeaderKey;
    buttonsList[index].withColoredIcon = true;
  }
};

const handleButtonOnDelete = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onDelete) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK' || buttonName === 'editLink') {
      buttonsList[index].onDelete = () => {
        editorCommands.deleteDecoration(decorationButtons[buttonName] as typeof RICOS_LINK_TYPE);
      };
    }
  }
};

const handleButtonOnDone = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onDone) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINK' || buttonName === 'editLink') {
      buttonsList[index].onDone = data => {
        editorCommands.insertDecoration(decorationButtons[buttonName], data);
      };
    }
  }
};

const handleButtonOnChange = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onChange) {
    const buttonName = buttonsList[index].name;
    if (['LINE_SPACING', 'FONT_SIZE'].includes(buttonName)) {
      buttonsList[index].onChange = value => {
        updateDynamicStyles(value, editorCommands, buttonName);
      };
    }
  }
};

const handleButtonOnCancel = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onCancel) {
    const buttonName = buttonsList[index].name;
    if (buttonName === 'LINE_SPACING') {
      buttonsList[index].onCancel = () => editorCommands.loadEditorState();
    }
  }
};

const handleButtonSaveState = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].saveState) {
    buttonsList[index].saveState = () => {
      editorCommands.saveSelectionState();
      editorCommands.saveEditorState();
    };
  }
};

const handleButtonLoadSelection = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].loadSelection) {
    buttonsList[index].loadSelection = () => {
      setTimeout(() => editorCommands.loadSelectionState());
    };
  }
};

const handleButtonSaveSelection = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].saveSelection) {
    buttonsList[index].saveSelection = () => {
      editorCommands.saveSelectionState();
    };
  }
};

const handleTitleButton = (buttonsList, index, editorCommands: editorCommands) => {
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
  buttonsList[index].getIcon = () => buttonsFullData[buttonsList[index].name][headingKey].icon;
  buttonsList[index].onClick = () =>
    editorCommands.setBlockType(buttonsFullData[buttonsList[index].name][headingKey].action);
  buttonsList[index].isActive = () => headingKey === 'header-three' || headingKey === 'header-two';
};

const handleButtonOnSave = (buttonsList, index, editorCommands: editorCommands) => {
  if (buttonsFullData[buttonsList[index].name].onSave) {
    const buttonName = buttonsList[index].name;
    if (Object.keys(textBlockButtons).includes(buttonName)) {
      buttonsList[index].onSave = type => {
        editorCommands.setBlockType(type);
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
  handleFileUpload
) => {
  const buttonName = buttonsList[index].name;
  if (buttonsFullData[buttonName].modal) {
    buttonsList[index].modal = buttonsFullData[buttonName].modal;
    if (buttonName === 'HEADINGS') {
      const Modal = buttonsFullData[buttonName].modal;
      const currentHeading = HEADER_TYPE_MAP[getCurrentHeading(editorCommands)];
      buttonsList[index].modal = props =>
        Modal && <Modal {...props} currentSelect={currentHeading} />;
    } else if (buttonName === 'Alignment') {
      const alignment = editorCommands.getTextAlignment();
      const Modal = buttonsFullData[buttonName].modal;
      buttonsList[index].modal = props => Modal && <Modal {...props} currentSelect={alignment} />;
    } else if (buttonName === 'LINE_SPACING') {
      const Modal = buttonsFullData[buttonName].modal;
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
        const Modal = buttonsFullData[buttonName].modal;
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
      const Modal = buttonsFullData[buttonName].modal;
      buttonsList[index].modal = props =>
        Modal && <Modal {...props} currentSelect={getFontSize(editorCommands)} t={t} />;
    } else if (Object.keys(fileUploadButtons).includes(buttonName)) {
      const Modal = buttonsFullData[buttonName].modal;
      const typeDataMap = {
        Image: {
          type: IMAGE_TYPE,
          tempData: imageTempData,
          data: imageData,
          uploadFunc: editorCommands.addImage,
        },
        Gallery: {
          type: GALLERY_TYPE,
          tempData: galleryTempData,
          data: galleryData,
          uploadFunc: editorCommands.addGallery,
        },
        File: {
          type: FILE_UPLOAD_TYPE,
          tempData: fileTempData,
          data: fileData,
          uploadFunc: editorCommands.addFile,
        },
      };
      const { type, tempData, data, uploadFunc } = typeDataMap[buttonName];
      const onChange = e => {
        if (e.target.files) {
          const files = Array.from(e.target.files as File[]).filter((file: File) =>
            file.type.startsWith('image')
          );
          //With insertBlock & setBlock commands
          if (shouldBehaveLikeNativeApp) {
            const id = editorCommands.insertBlock(
              fileUploadButtons[buttonName],
              { ...convertBlockDataToRicos(type, tempData), loading: true },
              {
                isRicosSchema: true,
              }
            );
            setTimeout(() => {
              editorCommands.setBlock(
                id,
                fileUploadButtons[buttonName],
                convertBlockDataToRicos(type, data)
              );
            }, 2000);
          } else {
            uploadFunc?.(files);
          }
          e.target.value = null;
        }
      };
      if (handleFileUpload) {
        buttonsList[index].modal = undefined;
        buttonsList[index].type = 'button';
      } else {
        buttonsList[index].modal = props => Modal && <Modal {...props} onChange={onChange} />;
      }
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
    buttonsList[index].isActive = () =>
      editorCommands.hasInlineStyle(inlineStyleButtons[buttonName]);
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
  experiments,
  handleFileUpload
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
  } else if (Object.keys(insertBlockButtons).includes(buttonName)) {
    buttonsList[index].onClick = () =>
      editorCommands.insertBlock(
        insertBlockButtons[buttonName],
        buttonsFullData[buttonName].defaultData,
        { isRicosSchema: true }
      );
  } else if (Object.keys(fileUploadButtons).includes(buttonName)) {
    if (handleFileUpload) {
      buttonsList[index].onClick = () =>
        handleFileUpload(
          0,
          false,
          data =>
            editorCommands.insertBlock(
              fileUploadButtons[buttonName],
              buttonsFullData[buttonName].defaultData,
              { isRicosSchema: true }
            ),
          () => {},
          buttonsFullData[buttonName].defaultData
        );
    } else {
      buttonsList[index].type = 'modal';
    }
  } else {
    // eslint-disable-next-line no-console
    buttonsList[index].onClick = () => console.log('click');
  }
};

const handleButtonArrow = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].arrow) {
    buttonsList[index].arrow = buttonsFullData[buttonsList[index].name].arrow;
  }
};

const getFontSize = (editorCommands: editorCommands) => {
  const fontSize = editorCommands.getFontSize() || '';
  const pxRegex = new RegExp('[0-9]+[px]');
  return pxRegex.exec(fontSize) ? fontSize.split('p')[0] : '';
};

const handleButtonLabel = (buttonsList, index, editorCommands: editorCommands, t) => {
  const buttonName = buttonsList[index].name;
  if (buttonsFullData[buttonName].label) {
    buttonsList[index].getLabel = () => buttonsFullData[buttonName].label;
    if (buttonName === 'HEADINGS') {
      buttonsList[index].getLabel = () => translateHeading(getCurrentHeading(editorCommands), t);
    } else if (buttonName === 'FONT_SIZE') {
      buttonsList[index].getLabel = () => getFontSize(editorCommands);
    }
  }
};

const handleButtonTooltip = (buttonsList, index, t, osName) => {
  if (buttonsFullData[buttonsList[index].name].tooltip) {
    const tooltipShortcut = buttonsFullData[buttonsList[index].name].tooltipShortcut;
    buttonsList[index].tooltip = t(
      buttonsFullData[buttonsList[index].name].tooltip,
      tooltipShortcut &&
        osName && {
          shortcut: tooltipShortcut[osName],
        }
    );
  }
};

const handleButtonPlugin = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].plugin) {
    buttonsList[index].plugin = buttonsFullData[buttonsList[index].name].plugin;
  }
};

const handleButtonDataHook = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].dataHook) {
    buttonsList[index].dataHook = buttonsFullData[buttonsList[index].name].dataHook;
  }
};

const handleButtIsMobileModalFullscreen = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name].isMobileModalFullscreen) {
    buttonsList[index].isMobileModalFullscreen =
      buttonsFullData[buttonsList[index].name].isMobileModalFullscreen;
  }
};

const handleButtonIcon = (buttonsList, index, editorCommands: editorCommands) => {
  const buttonName = buttonsList[index].name;
  if (buttonsFullData[buttonName].icon) {
    buttonsList[index].getIcon = () => buttonsFullData[buttonsList[index].name].icon;
  } else if (buttonName === 'Alignment') {
    buttonsList[index].getIcon = () => handleAlignmentIcon(editorCommands);
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

const handleButtonType = (buttonsList, index) => {
  if (buttonsFullData[buttonsList[index].name]?.type) {
    buttonsList[index].type = buttonsFullData[buttonsList[index].name].type;
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

const updateDynamicStyles = (value, editorCommands: editorCommands, buttonName) => {
  const data =
    buttonName === 'FONT_SIZE'
      ? { fontSize: value < 10 ? 10 : value > 96 ? 96 : value }
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
      const nodeListOfAllblocks = document.querySelectorAll(`[data-editor]`);
      // eslint-disable-next-line prefer-spread
      const arrayOfAllblocks = Array.apply(null, nodeListOfAllblocks);
      const element = arrayOfAllblocks.find(block => block.dataset.offsetKey === `${anchor}-0-0`);
      anchorScroll(element, experiments);
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
