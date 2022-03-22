import React, { Component } from 'react';
import type { ReactElement } from 'react';
import type { Pubsub, EditorCommands, PluginsDataMap } from 'wix-rich-content-common';

type PluginType = keyof PluginsDataMap;

interface BaseActionsProps {
  editorCommands: EditorCommands;
  closeModal: () => void;
  pubsub?: Pubsub;
  componentData: Record<string, unknown>;
  pluginType: PluginType;
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

  componentDidMount() {
    this.props.pubsub?.subscribe('componentData', this.updateComponentData); // TODO: Need to remove after upload functionality will change!
  }

  componentWillUnmount() {
    this.props.pubsub?.unsubscribe('componentData', this.updateComponentData); // TODO: Need to remove after upload functionality will change!
  }

  setData = data => {
    const { editorCommands, pubsub, pluginType } = this.props;
    const nodeId = editorCommands.getSelection().startKey;
    nodeId && editorCommands.setBlock(nodeId, pluginType, data);
    pubsub?.set('componentData', data); // TODO: Need to remove after toolbars will work with editorCommands !
  };

  updateData = data => {
    const newData = { ...this.state.data, ...data };
    this.setData(newData);
    this.setState({ data: newData });
  };

  updateComponentData = () => this.setState({ data: this.props.editorCommands.getSelectedData() });

  onSave = () => this.props.closeModal?.();

  onCancel = () => {
    this.setData(this.initialData);
    this.props.closeModal?.();
  };

  render() {
    return React.cloneElement(this.props.children, {
      onSave: this.onSave,
      onCancel: this.onCancel,
      updateData: this.updateData,
      updateComponentData: this.updateComponentData,
      componentData: this.state.data || this.props.componentData,
      setData: this.setData,
    });
  }
}

export const withModalBaseActions = (WrappedComponent, props: BaseActionsProps) => (
  <ModalBaseActions {...props}>{WrappedComponent}</ModalBaseActions>
);
