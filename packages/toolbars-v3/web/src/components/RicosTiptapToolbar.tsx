import React, { Component } from 'react';
import '../style.scss';
import ToolbarComponent from './Toolbar/Toolbar';
import type { Content } from '../Content';
import { RicosToolbar } from '../RicosToolbar';
import { ToolbarItemCreator } from '../ToolbarItemCreator';
import { toolbarItemsRenders } from '../toolbarItemsRenders';
import { tiptapStaticToolbarConfig } from '../toolbarItemConfig/tiptapToolbarItemConfig';
import type { Node } from 'prosemirror-model';
import type { IToolbarItemConfigTiptap } from '../types';
interface RicosTiptapToolbarProps {
  content: Content<Node[]>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  toolbarItemsConfig: IToolbarItemConfigTiptap[];
  onLoad?: (toolbar: RicosToolbar) => void;
  isMobile: boolean;
  maxWidth?: number;
}
interface RicosTiptapToolbarState {}

class RicosTiptapToolbar extends Component<RicosTiptapToolbarProps, RicosTiptapToolbarState> {
  toolbar: RicosToolbar | null = null;

  componentDidMount() {
    const { content, editorCommands, toolbarItemsConfig, onLoad } = this.props;

    this.toolbar = RicosToolbar.create({
      toolbarItemCreators: toolbarItemsConfig.map(config => ToolbarItemCreator.create(config)),
      content,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      editorCommands,
    });

    this.forceUpdate();
    onLoad?.(this.toolbar);
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.editorCommands !== this.props.editorCommands) {
      this.toolbar?.setEditorCommands(nextProps.editorCommands);
    }
  }

  render() {
    const { isMobile = false, maxWidth } = this.props;
    return (
      <div>
        <div>
          {this.toolbar && (
            <ToolbarComponent
              toolbar={this.toolbar}
              toolbarItemsRenders={toolbarItemsRenders}
              isMobile={isMobile}
              maxWidth={maxWidth}
            />
          )}
        </div>
      </div>
    );
  }
}

export default RicosTiptapToolbar;
