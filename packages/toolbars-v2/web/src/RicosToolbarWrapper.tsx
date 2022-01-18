import React, { Component } from 'react';
import './style.scss';
import ToolbarComponent from './components/Toolbar';
import TiptapPosition from './components/TiptapPosition';
import { staticToolbarConfig, floatingToolbarConfig } from './toolbarItemConfig';
import { Content } from './Content';
import { RicosToolbar } from './RicosToolbar';
import { ToolbarItem } from './ToolbarItem';
import { toolbarItemsRenders } from './toolbarItemsRenders';

interface AppProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  nodes: any;
}
interface AppState {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedContent: any;
}

class RicosToolbarWrapper extends Component<AppProps, AppState> {
  staticToolbar: RicosToolbar | null = null;

  floatingToolbar: RicosToolbar | null = null;

  content: Content;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor: any;

  constructor(props) {
    super(props);
    this.content = Content.create(null);

    this.state = {
      selectedContent: null,
    };
  }

  componentDidUpdate(prevProps) {
    const { editor, nodes } = this.props;
    const { prevEditor, prevNodes } = prevProps;
    if (editor !== prevEditor) {
      this.onEditorLoad(editor);
    }
    if (nodes !== prevNodes) {
      this.setSelection(nodes);
    }
  }

  renderNodeContent() {
    return JSON.stringify(this.state.selectedContent);
  }

  setSelection = nodes => {
    this.content.updateContent(nodes);

    this.setState({ selectedContent: nodes });
  };

  onEditorLoad(editor) {
    this.editor = editor;
    this.staticToolbar = RicosToolbar.create({
      toolbarItemCreators: staticToolbarConfig.map(config => ToolbarItem.create(config)),
      content: this.content,
      editor,
    });

    this.floatingToolbar = RicosToolbar.create({
      toolbarItemCreators: floatingToolbarConfig.map(config => ToolbarItem.create(config)),
      content: this.content,
      editor,
    });

    // eslint-disable-next-line no-console
    console.log('this.toolbar ', this.editor);
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <div>
          Static Toolbar
          {this.staticToolbar && (
            <ToolbarComponent
              toolbar={this.staticToolbar}
              toolbarItemsRenders={toolbarItemsRenders}
            />
          )}
        </div>
        <div>
          Floating Toolbar
          {this.floatingToolbar && (
            <TiptapPosition editor={this.editor}>
              {({ left, top, isCollapsed }) => {
                return (
                  <div
                    className="floatingToolbar"
                    style={{
                      left,
                      top: top - 40,
                      zIndex: 11,
                      background: '#FFF',
                      position: 'absolute',
                      display: isCollapsed ? 'none' : 'block',
                    }}
                  >
                    <ToolbarComponent
                      toolbar={this.floatingToolbar as RicosToolbar}
                      toolbarItemsRenders={toolbarItemsRenders}
                    />
                  </div>
                );
              }}
            </TiptapPosition>
          )}
        </div>
        <div style={{ height: 100, overflow: 'auto' }}>{this.renderNodeContent()}</div>
      </div>
    );
  }
}

export default RicosToolbarWrapper;
