import React, { Component, ReactElement } from 'react';
import { Pubsub } from 'wix-rich-content-common';
import { isEmpty } from 'lodash';
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  children: ReactElement;
  closeModal: () => void;
  pubsub: Pubsub;
  componentData: Record<string, unknown>;
}

interface State {
  data: Record<string, unknown>;
}

class EditorCommandModalProvider extends Component<Props, State> {
  initialData: Record<string, unknown>;

  pluginType: string;

  constructor(props) {
    super(props);
    const componentData = props.editorCommands.getSelectedData();
    this.initialData = isEmpty(componentData) ? props.componentData : componentData;
    this.pluginType = props.editorCommands.getSelectedType();
    this.state = { data: this.initialData };
  }

  deleteBlock = () =>
    this.props.editorCommands.deleteBlock(this.props.editorCommands.getSelection().focusKey);

  updateData = data => {
    const { editorCommands, pubsub } = this.props;
    const newData = { ...this.state.data, ...data };
    editorCommands.setBlock(editorCommands.getSelection().focusKey, this.pluginType, newData);
    pubsub.set('componentData', newData); // Need to remove after toolbars will work with editorCommands !
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
