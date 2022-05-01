import React, { Component } from 'react';
import '../style.scss';
import ToolbarComponent from './Toolbar/Toolbar';
import type { Content } from '../Content';
import { RicosToolbar } from '../RicosToolbar';
import { ToolbarItemCreator } from '../ToolbarItemCreator';
import { toolbarItemsRenders } from '../toolbarItemsRenders';
import { tiptapStaticToolbarConfig } from '../toolbarItemConfig/tiptapToolbarItemConfig';
import { tiptapPluginToolbarConfig } from '../toolbarItemConfig/tiptapPluginToolbarItemConfig';
import type { Node } from 'prosemirror-model';
interface RicosTiptapToolbarProps {
  content: Content<Node[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
}
interface RicosTiptapToolbarState {}

class RicosTiptapToolbar extends Component<RicosTiptapToolbarProps, RicosTiptapToolbarState> {
  staticToolbar: RicosToolbar | null = null;

  pluginToolbar: RicosToolbar | null = null;

  componentDidMount() {
    const { content, editorCommands } = this.props;

    this.staticToolbar = RicosToolbar.create({
      toolbarItemCreators: tiptapStaticToolbarConfig.map(config =>
        ToolbarItemCreator.create(config)
      ),
      content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorCommands,
    });

    this.pluginToolbar = RicosToolbar.create({
      toolbarItemCreators: tiptapPluginToolbarConfig.map(config =>
        ToolbarItemCreator.create(config)
      ),
      content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorCommands,
    });

    this.forceUpdate();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.editorCommands !== this.props.editorCommands) {
      this.staticToolbar?.setEditorCommands(nextProps.editorCommands);
      this.pluginToolbar?.setEditorCommands(nextProps.editorCommands);
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.staticToolbar && (
            <ToolbarComponent
              toolbar={this.staticToolbar}
              toolbarItemsRenders={toolbarItemsRenders}
              isMobile={false}
            />
          )}
          {this.pluginToolbar && (
            <ToolbarComponent
              toolbar={this.pluginToolbar}
              toolbarItemsRenders={toolbarItemsRenders}
              isMobile={false}
            />
          )}
        </div>
      </div>
    );
  }
}

export default RicosTiptapToolbar;
