import React from 'react';
import type { Node } from 'prosemirror-model';
import type { Content } from 'wix-rich-content-toolbars-v3';
import { RicosToolbarComponent } from 'wix-rich-content-toolbars-v3';
import { withRicosContext } from 'wix-rich-content-editor-common';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { withTiptapEditorContext } from 'wix-tiptap-editor';
import { PluginsContext } from 'ricos-plugins';
import type { GeneralContext } from 'ricos-types';

type PluginsToolbarProps = {
  content: Content<Node[]>;
};

class PluginsToolbar extends React.Component<
  PluginsToolbarProps & { ricosContext: GeneralContext; editor: RichContentAdapter }
> {
  renderPluginToolbar(plugins) {
    const {
      ricosContext,
      editor: { tiptapEditor },
      content,
    } = this.props;

    const toolbar = plugins.getVisibleToolbar(content.value);
    if (toolbar && !ricosContext.isMobile) {
      return (
        <RicosToolbarComponent
          isMobile={ricosContext.isMobile}
          content={content}
          editorCommands={tiptapEditor}
          toolbarItemsConfig={toolbar.toToolbarItemsConfig()}
          toolbarItemsRenders={toolbar.getToolberButtonsRenderers()}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    return (
      <PluginsContext.Consumer>
        {({ plugins }) => this.renderPluginToolbar(plugins)}
      </PluginsContext.Consumer>
    );
  }
}
const PluginsToolbarWithContext = withRicosContext<PluginsToolbarProps>()(
  withTiptapEditorContext<PluginsToolbarProps>(PluginsToolbar)
);
export default PluginsToolbarWithContext;
