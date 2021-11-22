/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  EditorCommands,
  EditorPlugin,
  LinkPanelSettings,
  ToolbarType,
  AvailableExperiments,
  TextButtons,
} from 'wix-rich-content-common';
import { LinkSettings, RicosCssOverride, RicosTheme, ToolbarSettings } from 'ricos-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';
import { filterButtons } from './utils/toolbarsUtils';
import { toolbarSettingsFromConfig } from './utils/toolbarsConfig';

interface LinkToolbarProps {
  activeEditor: RichContentEditor;
  textToolbarType?: string | null;
  isMobile?: boolean;
  theme?: RicosTheme;
  plugins?: EditorPlugin[];
  linkPanelSettings?: LinkPanelSettings;
  linkSettings?: LinkSettings;
  onInlineToolbarOpen?: (toolbarType: ToolbarType) => void;
  onToolbarButtonClick?: (name: string, toolbarType: ToolbarType, value?: boolean | string) => void;
  experiments?: AvailableExperiments;
  getEditorContainer: () => Element;
  cssOverride?: RicosCssOverride;
  toolbarSettings?: ToolbarSettings;
}

interface State {}

class LinkToolbar extends Component<LinkToolbarProps, State> {
  updateToolbar = () => {
    this.forceUpdate();
  };

  render() {
    const {
      activeEditor,
      isMobile,
      theme,
      experiments,
      getEditorContainer,
      cssOverride,
      toolbarSettings = {},
      textToolbarType,
    } = this.props;
    const rawButtons = ['goToLink', '|', 'editLink', '|', 'removeLink'];
    const linkToolbarButtons: TextButtons = {
      mobile: rawButtons,
      desktop: rawButtons,
    };
    const linkToolbarSetting = toolbarSettingsFromConfig({
      toolbarSettings,
      isMobile,
      textButtons: linkToolbarButtons,
      toolbarType: textToolbarType,
    });
    const shouldCreateToolbar = linkToolbarSetting?.shouldCreate;
    if (shouldCreateToolbar === false) {
      return null;
    }
    const editorCommands: EditorCommands = activeEditor.getEditorCommands();
    const selection = editorCommands.getSelection();
    const showLinkToolbar =
      selection.isCollapsed && selection.isFocused && editorCommands.hasLinkInSelection();
    const t = activeEditor.getT();
    const focusEditor = () => activeEditor.focus();
    const filteredFormattingToolbarButtons = filterButtons(rawButtons, activeEditor);
    const linkConfig = this.props.plugins?.find(plugin => plugin.type === 'LINK')?.config;
    const linkPanelData = {
      linkTypes: linkConfig?.linkTypes,
      onLinkAdd: linkConfig?.onLinkAdd,
      uiSettings: { linkPanel: this.props.linkPanelSettings },
      linkSettings: this.props.linkSettings,
      isMobile,
    };
    const onInlineToolbarOpen = () => this.props.onInlineToolbarOpen?.(ToolbarType.LINK);
    const onToolbarButtonClick = (name, value = undefined) => {
      this.props.onToolbarButtonClick?.(name, ToolbarType.LINK, value);
    };
    const ToolbarToRender = (
      <RicosToolbar
        theme={theme}
        isMobile={isMobile}
        t={t}
        editorCommands={editorCommands}
        buttons={filteredFormattingToolbarButtons}
        linkPanelData={linkPanelData}
        // onToolbarButtonClick={onToolbarButtonClick}
        experiments={experiments}
        getEditorContainer={getEditorContainer}
        cssOverride={cssOverride}
      />
    );
    const ToolbarContainer = isMobile ? StaticToolbarContainer : FloatingToolbarContainer;

    return (
      ((isMobile && showLinkToolbar) || !isMobile) && (
        <ToolbarContainer
          isMobile={isMobile}
          showToolbar={showLinkToolbar || false}
          focusEditor={focusEditor}
          // onInlineToolbarOpen={onInlineToolbarOpen}
        >
          {ToolbarToRender}
        </ToolbarContainer>
      )
    );
  }
}

export default LinkToolbar;
