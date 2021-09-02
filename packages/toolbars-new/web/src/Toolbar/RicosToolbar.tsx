/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import Toolbar from './Toolbar';
import { TOOLBAR_BUTTON_TYPES } from './consts';
import { createButtonsList } from './buttonsListCreator';
import {
  RichContentTheme,
  TranslationFunction,
  DesktopTextButtons,
  EditorCommands,
  AnchorTarget,
  RelValue,
  Link_Rel,
  CustomAnchorScroll,
  AvailableExperiments,
} from 'wix-rich-content-common';

type formattingToolbarButtonsKeysType =
  | DesktopTextButtons
  | {
      ios?: string[] | undefined;
      android?: string[] | undefined;
    }
  | undefined;

interface RicosToolbarProps {
  isMobile?: boolean;
  tabIndex?: number;
  t: TranslationFunction;
  vertical?: boolean;
  buttons?: formattingToolbarButtonsKeysType;
  editorCommands: EditorCommands;
  plugins?: string[];
  setKeepOpen?: (boolean) => void;
  afterClick?: () => void;
  nestedMenu?: boolean;
  theme?: RichContentTheme;
  linkPanelData?: {
    linkTypes?: any;
    uiSettings?: {
      linkPanel?: {
        dropDown?: any;
        externalPopups?: boolean;
        showNewTabCheckbox?: boolean;
        showNoFollowCheckbox?: boolean;
        showSponsoredCheckbox?: boolean;
      };
    };
    isMobile?: boolean;
    linkSettings?: {
      anchorTarget?: AnchorTarget;
      relValue?: RelValue;
      rel?: Link_Rel;
      customAnchorScroll?: CustomAnchorScroll;
    };
  };
  colorPickerData?: any;
  onToolbarButtonClick?: (name: string, value?: any) => void;
  experiments?: AvailableExperiments;
}

class RicosToolbar extends Component<RicosToolbarProps> {
  separateByGaps = buttons => {
    const separatedButtons: any = [[]];
    buttons.forEach(button => {
      if (button.type !== TOOLBAR_BUTTON_TYPES.GAP) {
        separatedButtons[separatedButtons.length - 1].push(button);
      } else {
        separatedButtons.push([]);
      }
    });
    return separatedButtons;
  };

  cleanUnwantedSeparators = buttons => {
    // eslint-disable-next-line fp/no-loops
    while (buttons[0].type === 'SEPARATOR') {
      buttons.shift();
    }
    // eslint-disable-next-line fp/no-loops
    while (buttons[buttons.length - 1].type === 'SEPARATOR') {
      buttons.pop();
    }
    return buttons.filter((button, index) => {
      return !(button.type === 'SEPARATOR' && buttons[index + 1].type === 'SEPARATOR');
    });
  };

  render() {
    const {
      buttons,
      editorCommands,
      t,
      plugins,
      linkPanelData,
      colorPickerData,
      isMobile,
      theme,
      vertical,
      setKeepOpen,
      afterClick,
      nestedMenu,
      experiments,
    } = this.props;
    const updatedButtons = createButtonsList(
      buttons,
      editorCommands,
      t,
      plugins,
      linkPanelData,
      colorPickerData,
      experiments
    );
    const buttonsWithoutUnwantedSeparators =
      updatedButtons.length > 0 && this.cleanUnwantedSeparators(updatedButtons);
    const buttonsSeparatedByGaps = this.separateByGaps(buttonsWithoutUnwantedSeparators);

    return (
      <Toolbar
        buttons={buttonsSeparatedByGaps}
        t={t}
        isMobile={isMobile}
        theme={theme}
        vertical={vertical}
        setKeepOpen={setKeepOpen}
        afterClick={afterClick}
        nestedMenu={nestedMenu}
        onToolbarButtonClick={this.props.onToolbarButtonClick}
      />
    );
  }
}

export default RicosToolbar;
