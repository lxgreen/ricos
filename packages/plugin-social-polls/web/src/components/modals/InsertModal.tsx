import React, { Component } from 'react';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import type { ModalContextValue } from 'ricos-modals';
import { withModalContext } from 'ricos-modals';
import type { GeneralContext } from 'ricos-types';
import type { EditorContextValue } from 'wix-rich-content-editor-common';
import { withEditorCommands, withRicosContext } from 'wix-rich-content-editor-common';
import { pollModals, POLL_TYPE } from '../../types';
import { PollPresetSelector } from '../settings/preset-selector/PollPresetSelector.jsx';

interface Props {
  context: ModalContextValue;
  ricosContext: GeneralContext;
  giphySdkApiKey: string;
  componentData: Record<string, unknown>;
  editorCommandsContext: EditorContextValue;
}

class InsertModal extends Component<Props> {
  closeModal = () => {
    this.props.context.modalService.closeModal(pollModals.insert);
  };

  onPollAdd = poll => {
    const { editorCommandsContext } = this.props;
    const editorCommands = editorCommandsContext.getEditorCommands();
    const data = convertBlockDataToRicos(POLL_TYPE, poll);
    editorCommands?.insertBlock(POLL_TYPE, data);
    this.closeModal();
  };

  render() {
    const {
      componentData,
      ricosContext: { theme, t, isMobile },
    } = this.props;
    return (
      <PollPresetSelector
        componentData={componentData}
        theme={theme}
        t={t}
        isMobile={isMobile}
        onPollAdd={this.onPollAdd}
        closeModal={this.closeModal}
      />
    );
  }
}

export default withRicosContext()(withModalContext(withEditorCommands()(InsertModal)));
