import React from 'react';
import ReactDOM from 'react-dom';
import type { Node } from 'prosemirror-model';
import type { Content } from 'wix-rich-content-toolbars-v3';
import {
  FloatingToolbar,
  RicosTiptapToolbar,
  tiptapStaticToolbarConfig,
} from 'wix-rich-content-toolbars-v3';
import type { ToolbarSettings } from 'ricos-common';
import {
  desktopTextButtonList,
  mobileTextButtonList,
} from '../toolbars/utils/defaultTextFormattingButtons';
import type { TextButtons, ToolbarSettingsFunctions } from 'wix-rich-content-common';
import { TOOLBARS, mergeToolbarSettings, withRicosContext } from 'wix-rich-content-editor-common';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { withTiptapEditorContext } from 'wix-tiptap-editor';
import { getDefaultToolbarSettings } from 'wix-rich-content-editor';
import RicosPortal from '../modals/RicosPortal';

import { ToolbarConfig } from './ricosToolbarConfig';
import type { GeneralContext } from 'ricos-types';

type RicosToolbarProps = {
  content: Content<Node[]>;
  toolbarSettings?: ToolbarSettings;
};

type RicosToolbarState = {
  finalToolbarSettings?: ToolbarSettingsFunctions[];
};
class RicosToolbars extends React.Component<
  RicosToolbarProps & { ricosContext: GeneralContext; editor: RichContentAdapter },
  RicosToolbarState
> {
  state: Readonly<RicosToolbarState> = {
    finalToolbarSettings: undefined,
  };

  onSelectionUpdate = ({ editor }) => {
    const { content } = this.props;
    const getSelectedNodes = ({ editor }) => {
      const selection = editor.state.selection;
      const nodes: Node[] = [];
      editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
        nodes.push(node);
      });

      return nodes;
    };
    const selectedNodes = getSelectedNodes({ editor });
    content.update(selectedNodes);
  };

  shouldRenderStaticFormattingToolbar() {
    const { toolbarSettings } = this.props;
    return !!toolbarSettings?.useStaticTextToolbar;
  }

  getToolbarConfig(finaltoolbarSettings: ToolbarSettingsFunctions[], toolbarType: TOOLBARS) {
    const toolbarConfig = finaltoolbarSettings.find(setting => setting.name === toolbarType);
    return toolbarConfig;
  }

  initToolbarSettings() {
    const { toolbarSettings } = this.props;
    if (toolbarSettings?.getToolbarSettings) {
      const textButtons: TextButtons = {
        mobile: mobileTextButtonList,
        desktop: desktopTextButtonList,
      };

      const defaultSettings = getDefaultToolbarSettings({
        // pluginButtons,
        // pluginButtonNames,
        textButtons,
        // pluginTextButtons: pluginTextButtonMap,
        // pluginButtonProps,
        // tablePluginMenu,
      });
      const customSettings = toolbarSettings.getToolbarSettings({
        textButtons,
      });

      const finalToolbarSettings = mergeToolbarSettings({ defaultSettings, customSettings });
      this.setState({
        finalToolbarSettings,
      });
    }
  }

  componentDidMount() {
    const {
      editor: { tiptapEditor },
    } = this.props;

    tiptapEditor.on('selectionUpdate', this.onSelectionUpdate);
    tiptapEditor.on('update', this.onSelectionUpdate);

    this.initToolbarSettings();
  }

  componentWillUnmount() {
    const {
      editor: { tiptapEditor },
    } = this.props;
    tiptapEditor.off('selectionUpdate', this.onSelectionUpdate);
    tiptapEditor.off('update', this.onSelectionUpdate);
  }

  renderFormattingToolbar(finaltoolbarSettings: ToolbarSettingsFunctions[]) {
    const {
      ricosContext,
      editor: { tiptapEditor },
      toolbarSettings,
    } = this.props;

    const toolbarType = TOOLBARS.FORMATTING;
    const toolbarConfig = this.getToolbarConfig(finaltoolbarSettings, toolbarType);
    const toolbarItemsConfig = ToolbarConfig.toTiptapToolbarItemsConfig(
      toolbarConfig,
      tiptapStaticToolbarConfig,
      toolbarType,
      'desktop'
    );

    if (
      !ricosContext.isMobile &&
      toolbarConfig?.shouldCreate?.() &&
      !toolbarSettings?.useStaticTextToolbar
    ) {
      const floatingFrameStyles = {
        border: 'solid 1px #ededed',
        borderRadius: 'var(--ricos-settings-whitebox-border-radius, 2px)',
        boxShadow: 'var(--ricos-settings-whitebox-box-shadow, 0 4px 8px 0 rgba(0, 0, 0, 0.07))',
        backgroundColor: '#FFF',
      };

      return (
        <FloatingToolbar editor={tiptapEditor} portal={ricosContext.portal}>
          {() => {
            const maxWidth = tiptapEditor.view.dom.clientWidth;
            return (
              <div data-hook="floating-formatting-toolbar" style={floatingFrameStyles}>
                <div style={{ width: maxWidth, maxWidth: 'fit-content' }}>
                  {this.renderToolbar(toolbarItemsConfig, { maxWidth })}
                </div>
              </div>
            );
          }}
        </FloatingToolbar>
      );
    } else {
      return null;
    }
  }

  renderMobileToolbar(finaltoolbarSettings: ToolbarSettingsFunctions[]) {
    const { ricosContext } = this.props;
    const toolbarType = TOOLBARS.MOBILE;
    const toolbarConfig = this.getToolbarConfig(finaltoolbarSettings, toolbarType);
    const toolbarItemsConfig = ToolbarConfig.toTiptapToolbarItemsConfig(
      toolbarConfig,
      tiptapStaticToolbarConfig,
      toolbarType,
      'mobile'
    );

    if (ricosContext.isMobile && toolbarConfig?.shouldCreate?.()) {
      return this.renderToolbar(toolbarItemsConfig);
    } else {
      return null;
    }
  }

  renderStaticToolbar(finaltoolbarSettings: ToolbarSettingsFunctions[]) {
    const { toolbarSettings, ricosContext } = this.props;
    const toolbarType = TOOLBARS.STATIC;
    const toolbarConfig = this.getToolbarConfig(finaltoolbarSettings, toolbarType);
    const htmlContainer = toolbarSettings?.textToolbarContainer;
    const toolbarItemsConfig = ToolbarConfig.toTiptapToolbarItemsConfig(
      toolbarConfig,
      tiptapStaticToolbarConfig,
      toolbarType,
      'desktop'
    );

    if (htmlContainer && toolbarConfig?.shouldCreate?.()) {
      return (
        <RicosPortal className={ricosContext.theme?.parentClass} container={htmlContainer}>
          {this.renderToolbar(toolbarItemsConfig)}
        </RicosPortal>
      );
    }
    if (toolbarSettings?.useStaticTextToolbar && toolbarConfig?.shouldCreate?.()) {
      return this.renderToolbar(toolbarItemsConfig);
    }

    return null;
  }

  renderToolbar(toolbarItemsConfig, options = {} as { maxWidth: number }) {
    const {
      content,
      editor: { tiptapEditor },
      ricosContext,
    } = this.props;
    const { maxWidth } = options;

    return (
      <RicosTiptapToolbar
        isMobile={ricosContext.isMobile}
        content={content}
        editorCommands={tiptapEditor}
        toolbarItemsConfig={toolbarItemsConfig}
        maxWidth={maxWidth}
      />
    );
  }

  render() {
    const { toolbarSettings } = this.props;
    if (!toolbarSettings?.getToolbarSettings) {
      console.error('RicosToolbars: getToolbarSettings is missing');
      return null;
    }
    const { finalToolbarSettings } = this.state;
    if (!finalToolbarSettings) {
      return null;
    }
    return (
      <>
        {this.renderStaticToolbar(finalToolbarSettings)}
        {this.renderMobileToolbar(finalToolbarSettings)}
        {this.renderFormattingToolbar(finalToolbarSettings)}
      </>
    );
  }
}
const RicosToolbarsWithContext = withRicosContext<RicosToolbarProps>()(
  withTiptapEditorContext<RicosToolbarProps>(RicosToolbars)
);
export default RicosToolbarsWithContext;
