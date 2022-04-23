import React, { Component } from 'react';
import '../style.scss';
import ToolbarComponent from './Toolbar/Toolbar';
import type { Content } from '../Content';
import { RicosToolbar } from '../RicosToolbar';
import { ToolbarItemCreator } from '../ToolbarItemCreator';
import { toolbarItemsRenders } from '../toolbarItemsRenders';
import { draftStaticToolbarConfig } from '../toolbarItemConfig/draftToolbarItemConfig';
import { draftStaticToolbarConfigDetachCommands } from '../toolbarItemConfig/draftToolbarItemConfigDetachCommands';
import type { AvailableExperiments } from 'ricos-types';
import { withToolbarContext } from '../utils/withContext';
import type { ToolbarContextType } from '../utils/toolbarContexts';

interface RicosDraftToolbarProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: Content<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  context: ToolbarContextType;
  experiments?: AvailableExperiments;
}
interface RicosDraftToolbarState {}

class RicosDraftToolbar extends Component<RicosDraftToolbarProps, RicosDraftToolbarState> {
  toolbar: RicosToolbar | null = null;

  componentDidMount() {
    const { content, editorCommands, experiments } = this.props;
    this.toolbar = RicosToolbar.create({
      toolbarItemCreators: (experiments?.detachCommandsFromEditor?.enabled
        ? draftStaticToolbarConfigDetachCommands
        : draftStaticToolbarConfig
      ).map(config => ToolbarItemCreator.create(config)),
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
    const { context } = this.props;
    const { isMobile } = context || {};
    return (
      <div>
        <div>
          {this.toolbar && (
            <ToolbarComponent
              toolbar={this.toolbar}
              toolbarItemsRenders={toolbarItemsRenders}
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    );
  }
}

export default withToolbarContext(RicosDraftToolbar);
