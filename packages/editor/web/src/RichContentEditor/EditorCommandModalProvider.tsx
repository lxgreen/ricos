import React, { Component, ReactElement } from 'react';
import { RICOS_IMAGE_TYPE, RICOS_GALLERY_TYPE } from 'wix-rich-content-common';

interface Props {
  modalName?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
  children: ReactElement;
  closeModal: () => void;
}

interface State {
  data: Record<string, unknown>;
}

const pluginTypeMap = {
  'image-settings': RICOS_IMAGE_TYPE,
  'gallery-settings': RICOS_GALLERY_TYPE,
};

class EditorCommandModalProvider extends Component<Props, State> {
  initialData: Record<string, unknown>;

  constructor(props) {
    super(props);
    this.initialData = props.editorCommands.getSelectedData();
    this.state = { data: this.initialData };
  }

  deleteBlock = () =>
    this.props.editorCommands.deleteBlock(this.props.editorCommands.getSelection().focusKey);

  updateData = data => {
    const { editorCommands, modalName = '' } = this.props;
    const newData = { ...this.state.data, ...data };
    editorCommands.setBlock(
      editorCommands.getSelection().focusKey,
      pluginTypeMap[modalName],
      newData
    );
    this.setState({ data: newData });
  };

  onSave = () => {
    this.props.closeModal();
  };

  onCancel = () => {
    this.updateData(this.initialData);
    this.props.closeModal();
  };

  render() {
    const { modalName = '', children } = this.props;
    return pluginTypeMap[modalName]
      ? React.cloneElement(children, {
          onSave: this.onSave,
          onCancel: this.onCancel,
          updateData: this.updateData,
          deleteBlock: this.deleteBlock,
          componentData: this.state.data,
        })
      : children;
  }
}

export default EditorCommandModalProvider;
