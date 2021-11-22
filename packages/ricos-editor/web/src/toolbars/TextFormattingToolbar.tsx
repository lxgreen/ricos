/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { RichContentEditor } from 'wix-rich-content-editor';
import {
  EditorCommands,
  TextButtons,
  EditorPlugin,
  LinkPanelSettings,
  ToolbarType,
  AvailableExperiments,
  getLangDir,
} from 'wix-rich-content-common';
import { LinkSettings, ToolbarSettings, RicosCssOverride, RicosTheme } from 'ricos-common';
import {
  FloatingToolbarContainer,
  RicosToolbar,
  StaticToolbarContainer,
} from 'wix-rich-content-toolbars-new';
import { mobileTextButtonList, desktopTextButtonList } from './utils/defaultTextFormattingButtons';
import { filterButtons, isLinkToolbarOpen, addConfigButtons } from './utils/toolbarsUtils';
import { toolbarSettingsFromConfig } from './utils/toolbarsConfig';

interface TextFormattingToolbarProps {
  activeEditor: RichContentEditor;
  textToolbarType?: string | null;
  isMobile?: boolean;
  theme?: RicosTheme;
  toolbarSettings?: ToolbarSettings;
  locale?: string;
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
  getEditorContainer: () => Element;
  cssOverride?: RicosCssOverride;
}

export type TextFormattingToolbarType = typeof TextFormattingToolbar;

interface State {
  keyForRerender: boolean;
}

class TextFormattingToolbar extends Component<TextFormattingToolbarProps, State> {
  constructor(props) {
    super(props);
    this.state = { keyForRerender: true };
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeEditor !== prevProps.activeEditor) {
      const { keyForRerender } = this.state;
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ keyForRerender: !keyForRerender });
    }
  }

  updateToolbar = () => {
    this.forceUpdate();
  };

  render() {
    const {
      activeEditor,
      textToolbarType,
      isMobile,
      theme,
      toolbarSettings = {},
      locale,
      experiments,
      getEditorContainer,
      cssOverride,
    } = this.props;
    const editorCommands: EditorCommands = activeEditor.getEditorCommands();
    const selection = editorCommands.getSelection();
    const showFormattingToolbar = !selection.isCollapsed && selection.isFocused;
    const t = activeEditor.getT();
    const focusEditor = () => activeEditor.focus();
    const textButtons: TextButtons = {
      mobile: mobileTextButtonList,
      desktop: desktopTextButtonList,
    };
    const formattingToolbarSetting = toolbarSettingsFromConfig({
      toolbarSettings,
      isMobile,
      textButtons,
      toolbarType: textToolbarType,
    });
    if (formattingToolbarSetting?.shouldCreate === false) {
      return null;
    }
    let formattingToolbarButtons;
    if (formattingToolbarSetting?.getButtons) {
      formattingToolbarButtons = formattingToolbarSetting?.getButtons;
    } else {
      formattingToolbarButtons = isMobile ? textButtons.mobile : textButtons.desktop;
    }

    const filteredFormattingToolbarButtons = filterButtons(formattingToolbarButtons, activeEditor);

    const configButtonMap = formattingToolbarSetting?.getTextPluginButtons;

    const buttonsWithConfigButtons = configButtonMap
      ? addConfigButtons(filteredFormattingToolbarButtons, configButtonMap)
      : filteredFormattingToolbarButtons;

    const getPluginConfig = pluginType =>
      this.props.plugins?.find(plugin => plugin.type === pluginType)?.config;

    const colorPickerData = {
      TEXT_COLOR: getPluginConfig('wix-rich-content-text-color'),
      TEXT_HIGHLIGHT: getPluginConfig('wix-rich-content-text-highlight'),
    };
    const linkConfig = getPluginConfig('LINK');
    const linkPanelData = {
      linkTypes: linkConfig?.linkTypes,
      onLinkAdd: linkConfig?.onLinkAdd,
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
        getEditorContainer={getEditorContainer}
        cssOverride={cssOverride}
      />
    );
    const ToolbarContainer =
      textToolbarType === ToolbarType.MOBILE || textToolbarType === ToolbarType.STATIC
        ? StaticToolbarContainer
        : FloatingToolbarContainer;
    const ToolbarWithContainerToRender = (
      <ToolbarContainer
        isMobile={isMobile}
        showToolbar={showFormattingToolbar || false}
        focusEditor={focusEditor}
        onInlineToolbarOpen={onInlineToolbarOpen}
      >
        {ToolbarToRender}
      </ToolbarContainer>
    );

    const textToolbarContainer = this.props.toolbarSettings?.textToolbarContainer;
    if (textToolbarContainer) {
      //render static toolbar inside provided container
      const staticToolbar = (
        <div
          key={`${this.state.keyForRerender}`}
          data-hook={'provided-container-toolbar'}
          dir={getLangDir(locale)}
        >
          {ToolbarWithContainerToRender}
        </div>
      );
      return ReactDOM.createPortal(staticToolbar, textToolbarContainer);
    } else {
      return !hideFormattingToolbar ? ToolbarWithContainerToRender : null;
    }
  }
}

export default TextFormattingToolbar;
