import React, { Component } from 'react';
import '../style.scss';
import ToolbarComponent from './Toolbar/Toolbar';
import type { Content } from '../Content';
import { RicosToolbar } from '../RicosToolbar';
import { ToolbarItemCreator } from '../ToolbarItemCreator';
import { toolbarItemsRenders } from '../toolbarItemsRenders';
import { tiptapStaticToolbarConfig } from '../toolbarItemConfig/tiptapToolbarItemConfig';
import type { Node } from 'prosemirror-model';
interface RicosTiptapToolbarProps {
  content: Content<Node[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
}
interface RicosTiptapToolbarState {}

class RicosTiptapToolbar extends Component<RicosTiptapToolbarProps, RicosTiptapToolbarState> {
  toolbar: RicosToolbar | null = null;

  componentDidMount() {
    const { content, editorCommands } = this.props;

    this.toolbar = RicosToolbar.create({
      toolbarItemCreators: tiptapStaticToolbarConfig.map(config =>
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
      this.toolbar?.setEditorCommands(nextProps.editorCommands);
    }
  }

  render() {
    return (
      <div>
        <div>
          {this.toolbar && (
            <ToolbarComponent
              toolbar={this.toolbar}
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
