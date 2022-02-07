import React, { Component } from 'react';
import './style.scss';
import ToolbarComponent from './components/Toolbar/Toolbar';
import type { Content } from './Content';
import { RicosToolbar } from './RicosToolbar';
import { ToolbarItemCreator } from './ToolbarItemCreator';
import { toolbarItemsRenders } from './toolbarItemsRenders';
import { draftStaticToolbarConfig } from './toolbarItemConfig/draftToolbarItemConfig';

interface RicosToolbarWrapperProps {
  content: Content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
}
interface RicosToolbarWrapperState {}

class RicosToolbarWrapper extends Component<RicosToolbarWrapperProps, RicosToolbarWrapperState> {
  toolbar: RicosToolbar | null = null;

  componentDidMount() {
    const { content, editorCommands } = this.props;
    this.toolbar = RicosToolbar.create({
      toolbarItemCreators: draftStaticToolbarConfig.map(config =>
        ToolbarItemCreator.create(config)
      ),
      content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorCommands: editorCommands as any,
    });

    this.forceUpdate();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.toolbar?.setEditorCommands(nextProps.editorCommands);
  }

  render() {
    return (
      <div>
        <div>
          {this.toolbar && (
            <ToolbarComponent toolbar={this.toolbar} toolbarItemsRenders={toolbarItemsRenders} />
          )}
        </div>
      </div>
    );
  }
}

export default RicosToolbarWrapper;
