/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  RichContentTheme,
  GetToolbarSettings,
  EditorCommands,
  TextButtons,
  EditorPlugin,
  LinkPanelSettings,
  ToolbarType,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { LinkSettings } from 'ricos-common';
import { isiOS } from 'wix-rich-content-editor-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';
import { get } from 'lodash';
import { mobileTextButtonList, desktopTextButtonList } from './utils/defaultTextFormattingButtons';
import { filterButtons, isLinkToolbarOpen, addConfigButtons } from './utils/toolbarsUtils';

interface TextFormattingToolbarProps {
  activeEditor: RichContentEditor;
  textToolbarType?: string | null;
  isMobile?: boolean;
  theme?: RichContentTheme;
  getToolbarSettings?: GetToolbarSettings;
  plugins?: EditorPlugin[];
  linkPanelSettings?: LinkPanelSettings;
  linkSettings?: LinkSettings;
  onInlineToolbarOpen?: (toolbarType: ToolbarType) => void;
  onToolbarButtonClick?: (
    name: string,
    toolbarType: ToolbarType,
    value?: any,
    pluginId?: string
  ) => void;
  experiments?: AvailableExperiments;
}

export type TextFormattingToolbarType = typeof TextFormattingToolbar;

class TextFormattingToolbar extends Component<TextFormattingToolbarProps> {
  updateToolbar = () => {
    this.forceUpdate();
  };

  render() {
    const {
      activeEditor,
      textToolbarType,
      isMobile,
      theme,
      getToolbarSettings = () => [],
      experiments,
    } = this.props;
    const editorCommands: EditorCommands = activeEditor.getEditorCommands();
    const selection = editorCommands.getSelection();
    const showFormattingToolbar = !selection.getIsCollapsed && selection.getIsFocused;
    const t = activeEditor.getT();
    const focusEditor = () => activeEditor.focus();
    const textButtons: TextButtons = {
      mobile: mobileTextButtonList,
      desktop: desktopTextButtonList,
    };
    const formattingToolbarSetting = getToolbarSettings({ textButtons }).find(
      toolbar => toolbar?.name === textToolbarType
    );
    const deviceName = !isMobile ? 'desktop' : isiOS() ? 'mobile.ios' : 'mobile.android';
    let formattingToolbarButtons;
    if (formattingToolbarSetting?.getButtons) {
      const allFormattingToolbarButtons = formattingToolbarSetting?.getButtons?.() as TextButtons;
      formattingToolbarButtons = get(allFormattingToolbarButtons, deviceName, []);
    } else {
      formattingToolbarButtons = isMobile ? textButtons.mobile : textButtons.desktop;
    }

    const filteredFormattingToolbarButtons = filterButtons(formattingToolbarButtons, activeEditor);

    const configButtonMap = formattingToolbarSetting?.getTextPluginButtons?.();

    const buttonsWithConfigButtons = configButtonMap
      ? addConfigButtons(filteredFormattingToolbarButtons, get(configButtonMap, deviceName, []))
      : filteredFormattingToolbarButtons;

    const getPluginConfig = pluginType =>
      this.props.plugins?.find(plugin => plugin.type === pluginType)?.config;

    const colorPickerData = {
      TEXT_COLOR: getPluginConfig('wix-rich-content-text-color'),
      TEXT_HIGHLIGHT: getPluginConfig('wix-rich-content-text-highlight'),
    };
    const linkPanelData = {
      linkTypes: getPluginConfig('LINK')?.linkTypes,
      uiSettings: { linkPanel: this.props.linkPanelSettings },
      linkSettings: this.props.linkSettings,
      isMobile,
    };
    const defaultLineSpacing = getPluginConfig('line-spacing')?.defaultSpacing;

    const headingsData = {
      ...getPluginConfig('wix-rich-content-plugin-headings'),
    };
    const onInlineToolbarOpen = () => this.props.onInlineToolbarOpen?.(ToolbarType.FORMATTING);
    const onToolbarButtonClick = (name, value = undefined, pluginId = undefined) => {
      this.props.onToolbarButtonClick?.(name, ToolbarType.FORMATTING, value, pluginId);
    };
    const hideFormattingToolbar = isMobile && isLinkToolbarOpen(activeEditor);
    const ToolbarToRender = (
      <RicosToolbar
        theme={theme}
        isMobile={isMobile}
        t={t}
        editorCommands={editorCommands}
        buttons={buttonsWithConfigButtons}
        linkPanelData={linkPanelData}
        colorPickerData={colorPickerData}
        headingsData={headingsData}
        onToolbarButtonClick={onToolbarButtonClick}
        experiments={experiments}
        defaultLineSpacing={defaultLineSpacing}
      />
    );
    const ToolbarContainer =
      textToolbarType === ToolbarType.MOBILE || textToolbarType === ToolbarType.STATIC
        ? StaticToolbarContainer
        : FloatingToolbarContainer;

    return !hideFormattingToolbar ? (
      <ToolbarContainer
        isMobile={isMobile}
        showToolbar={showFormattingToolbar || false}
        focusEditor={focusEditor}
        onInlineToolbarOpen={onInlineToolbarOpen}
      >
        {ToolbarToRender}
      </ToolbarContainer>
    ) : null;
  }
}

export default TextFormattingToolbar;
