import React, { Component, ReactElement } from 'react';
import { Pubsub } from 'wix-rich-content-common';
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  children: ReactElement;
  closeModal: () => void;
  pubsub: Pubsub;
  componentData: Record<string, unknown>;
  pluginType: string;
}

interface State {
  data: Record<string, unknown>;
}

class EditorCommandModalProvider extends Component<Props, State> {
  initialData: Record<string, unknown>;

  constructor(props) {
    super(props);
    this.initialData = props.componentData;
    this.state = { data: props.componentData };
  }

  deleteBlock = () =>
    this.props.editorCommands.deleteBlock(this.props.editorCommands.getSelection().focusKey);

  updateData = data => {
    const { editorCommands, pubsub, pluginType } = this.props;
    const newData = { ...this.state.data, ...data };
    editorCommands.setBlock(editorCommands.getSelection().startKey, pluginType, newData);
    pubsub.set('componentData', newData); // TODO: Need to remove after toolbars will work with editorCommands !
    this.setState({ data: newData });
  };

  onSave = () => this.props.closeModal?.();

  onCancel = () => {
    this.updateData(this.initialData);
    this.props.closeModal?.();
  };

  render() {
    return React.cloneElement(this.props.children, {
      onSave: this.onSave,
      onCancel: this.onCancel,
      updateData: this.updateData,
      deleteBlock: this.deleteBlock,
      componentData: this.state.data || this.props.componentData,
    });
  }
}

export default EditorCommandModalProvider;
