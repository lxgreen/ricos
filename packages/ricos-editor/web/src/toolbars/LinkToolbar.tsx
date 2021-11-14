/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  EditorCommands,
  EditorPlugin,
  LinkPanelSettings,
  ToolbarType,
  AvailableExperiments,
} from 'wix-rich-content-common';
import { LinkSettings, RicosCssOverride, RicosTheme } from 'ricos-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';
import { filterButtons } from './utils/toolbarsUtils';

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
    } = this.props;
    const editorCommands: EditorCommands = activeEditor.getEditorCommands();
    const selection = editorCommands.getSelection();
    const showLinkToolbar =
      selection.getIsCollapsed && selection.getIsFocused && editorCommands.hasLinkInSelection();
    const t = activeEditor.getT();
    const focusEditor = () => activeEditor.focus();
    const rawButtons = ['goToLink', '|', 'editLink', '|', 'removeLink'];
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
