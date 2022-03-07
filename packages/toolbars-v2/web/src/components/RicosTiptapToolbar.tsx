import React, { Component } from 'react';
import '../style.scss';
import ToolbarComponent from './Toolbar/Toolbar';
import type { Content } from '../Content';
import { RicosToolbar } from '../RicosToolbar';
import { ToolbarItemCreator } from '../ToolbarItemCreator';
import { toolbarItemsRenders } from '../toolbarItemsRenders';
import { tiptapStaticToolbarConfig } from '../toolbarItemConfig/tiptapToolbarItemConfig';
import { tiptapStaticToolbarConfigDetachCommands } from '../toolbarItemConfig/tiptapToolbarItemConfigDetachCommands';
import type { AvailableExperiments } from 'ricos-types';
interface RicosToolbarWrapperProps {
  content: Content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  experiments?: AvailableExperiments;
}
interface RicosToolbarWrapperState {}

class RicosToolbarWrapper extends Component<RicosToolbarWrapperProps, RicosToolbarWrapperState> {
  toolbar: RicosToolbar | null = null;

  componentDidMount() {
    const { content, editorCommands, experiments } = this.props;
    this.toolbar = RicosToolbar.create({
      toolbarItemCreators: (experiments?.detachCommandsFromEditor?.enabled
        ? tiptapStaticToolbarConfigDetachCommands
        : tiptapStaticToolbarConfig
      ).map(config => ToolbarItemCreator.create(config)),
      content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorCommands,
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
