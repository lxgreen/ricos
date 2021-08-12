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
  getLangDir,
  ToolbarType,
} from 'wix-rich-content-common';
import { LinkSettings } from 'ricos-common';
import { isiOS } from 'wix-rich-content-editor-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';
import { get } from 'lodash';
import { mobileTextButtonList, desktopTextButtonList } from '../';

interface TextFormattingToolbarProps {
  activeEditor: RichContentEditor;
  textToolbarType?: string | null;
  isMobile?: boolean;
  theme?: RichContentTheme;
  locale?: string;
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
}

class TextFormattingToolbar extends Component<TextFormattingToolbarProps> {
  getPluginsKey = () => {
    const { activeEditor } = this.props;
    const rawPlugins = activeEditor?.getPlugins?.();
    const plugins = rawPlugins.filter(plugin => plugin?.blockType !== undefined);
    const pluginsKeys = plugins.map(plugin => plugin.blockType);
    return pluginsKeys;
  };

  render() {
    const {
      activeEditor,
      textToolbarType,
      isMobile,
      theme,
      locale,
      getToolbarSettings = () => [],
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
    const plugins: string[] = this.getPluginsKey();
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
      anchorTarget: this.props.linkSettings?.anchorTarget,
      isMobile,
    };
    const baseStyles = { flex: 'none' };
    const baseMobileStyles = { ...baseStyles, position: 'sticky', top: 0, zIndex: 9 };
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
      />
    );
    const ToolbarContainer =
      textToolbarType === 'static' ? StaticToolbarContainer : FloatingToolbarContainer;

    return (
      <div style={isMobile ? baseMobileStyles : baseStyles} dir={getLangDir(locale)}>
        <ToolbarContainer
          isMobile={isMobile}
          showToolbar={showFormattingToolbar || false}
          focusEditor={focusEditor}
          onInlineToolbarOpen={onInlineToolbarOpen}
        >
          {ToolbarToRender}
        </ToolbarContainer>
      </div>
    );
  }
}

export default TextFormattingToolbar;
