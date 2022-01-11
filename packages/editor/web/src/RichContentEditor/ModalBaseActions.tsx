import React, { Component, ReactElement } from 'react';
import { Pubsub } from 'wix-rich-content-common';

interface BaseActionsProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  closeModal: () => void;
  pubsub: Pubsub;
  componentData: Record<string, unknown>;
  pluginType: string;
}

interface Props extends BaseActionsProps {
  children: ReactElement;
}

interface State {
  data: Record<string, unknown>;
}

class ModalBaseActions extends Component<Props, State> {
  initialData: Record<string, unknown>;

  constructor(props) {
    super(props);
    this.initialData = props.componentData;
    this.state = { data: props.componentData };
  }

  updateData = data => {
    const { editorCommands, pubsub, pluginType } = this.props;
    const newData = { ...this.state.data, ...data };
    editorCommands.setBlock(editorCommands.getSelection().startKey, pluginType, newData);
    pubsub.set('componentData', newData); // TODO: Need to remove after toolbars will work with editorCommands !
    this.setState({ data: newData });
  };

  updateComponentData = () => this.setState({ data: this.props.editorCommands.getSelectedData() });

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
      updateComponentData: this.updateComponentData,
      componentData: this.state.data || this.props.componentData,
    });
  }
}

export const withModalBaseActions = (WrappedComponent, props: BaseActionsProps) => (
  <ModalBaseActions {...props}>{WrappedComponent}</ModalBaseActions>
);
