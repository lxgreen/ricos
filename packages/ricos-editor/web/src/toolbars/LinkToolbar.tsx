import React, { Component } from 'react';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  RichContentTheme,
  GetToolbarSettings,
  EditorCommands,
  EditorPlugin,
  LinkPanelSettings,
  ToolbarType,
} from 'wix-rich-content-common';
import { LinkSettings } from 'ricos-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';

interface LinkToolbarProps {
  activeEditor: RichContentEditor;
  textToolbarType?: string | null;
  isMobile?: boolean;
  theme?: RichContentTheme;
  getToolbarSettings?: GetToolbarSettings;
  plugins?: EditorPlugin[];
  linkPanelSettings?: LinkPanelSettings;
  linkSettings?: LinkSettings;
  onInlineToolbarOpen?: (toolbarType: ToolbarType) => void;
  onToolbarButtonClick?: (name: string, toolbarType: ToolbarType, value?: boolean | string) => void;
}

interface State {}

class LinkToolbar extends Component<LinkToolbarProps, State> {
  getPluginsKey = () => {
    const { activeEditor } = this.props;
    const rawPlugins = activeEditor?.getPlugins?.();
    const plugins = rawPlugins.filter(plugin => plugin?.blockType !== undefined);
    const pluginsKeys = plugins.map(plugin => plugin.blockType);
    return pluginsKeys;
  };

  render() {
    const { activeEditor, isMobile, theme } = this.props;
    const editorCommands: EditorCommands = activeEditor.getEditorCommands();
    const selection = editorCommands.getSelection();
    const showLinkToolbar =
      selection.getIsCollapsed && selection.getIsFocused && editorCommands.hasLinkInSelection();
    const t = activeEditor.getT();
    const focusEditor = () => activeEditor.focus();
    const plugins: string[] = this.getPluginsKey();
    const linkPanelData = {
      linkTypes: this.props.plugins?.find(plugin => plugin.type === 'LINK')?.config.linkTypes,
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
        buttons={['goToLink', '|', 'editLink', '|', 'removeLink']}
        plugins={plugins}
        linkPanelData={linkPanelData}
        // onToolbarButtonClick={onToolbarButtonClick}
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
