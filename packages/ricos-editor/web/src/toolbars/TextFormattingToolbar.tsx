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
import { getPluginsKey } from './utils/toolbarsUtils';

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
    let toolbarType;
    if (isMobile) {
      toolbarType = 'MOBILE';
    } else if (textToolbarType === 'static') {
      toolbarType = 'STATIC';
    } else {
      toolbarType = 'INLINE';
    }
    const formattingToolbarSetting = getToolbarSettings({ textButtons }).find(
      toolbar => toolbar?.name === toolbarType
    );
    let formattingToolbarButtons;
    if (formattingToolbarSetting?.getButtons) {
      const allFormattingToolbarButtons = formattingToolbarSetting?.getButtons?.() as TextButtons;
      const deviceName = !isMobile ? 'desktop' : isiOS() ? 'mobile.ios' : 'mobile.android';
      formattingToolbarButtons = get(allFormattingToolbarButtons, deviceName, []);
    } else {
      formattingToolbarButtons = isMobile ? textButtons.mobile : textButtons.desktop;
    }
    const plugins: string[] = getPluginsKey(activeEditor);
    const colorPickerData = {
      TEXT_COLOR: this.props.plugins?.find(plugin => plugin.type === 'wix-rich-content-text-color')
        ?.config,
      TEXT_HIGHLIGHT: this.props.plugins?.find(
        plugin => plugin.type === 'wix-rich-content-text-highlight'
      )?.config,
    };
    const linkPanelData = {
      linkTypes: this.props.plugins?.find(plugin => plugin.type === 'LINK')?.config.linkTypes,
      uiSettings: { linkPanel: this.props.linkPanelSettings },
      linkSettings: this.props.linkSettings,
      isMobile,
    };
    const onInlineToolbarOpen = () => this.props.onInlineToolbarOpen?.(ToolbarType.FORMATTING);
    const onToolbarButtonClick = (name, value = undefined, pluginId = undefined) => {
      this.props.onToolbarButtonClick?.(name, ToolbarType.FORMATTING, value, pluginId);
    };
    const ToolbarToRender = (
      <RicosToolbar
        theme={theme}
        isMobile={isMobile}
        t={t}
        editorCommands={editorCommands}
        buttons={formattingToolbarButtons}
        plugins={plugins}
        linkPanelData={linkPanelData}
        colorPickerData={colorPickerData}
        onToolbarButtonClick={onToolbarButtonClick}
        experiments={experiments}
      />
    );
    const ToolbarContainer =
      textToolbarType === 'static' ? StaticToolbarContainer : FloatingToolbarContainer;

    return (
      <ToolbarContainer
        isMobile={isMobile}
        showToolbar={showFormattingToolbar || false}
        focusEditor={focusEditor}
        onInlineToolbarOpen={onInlineToolbarOpen}
      >
        {ToolbarToRender}
      </ToolbarContainer>
    );
  }
}

export default TextFormattingToolbar;
