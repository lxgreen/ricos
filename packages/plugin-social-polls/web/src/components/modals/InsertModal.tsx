import React, { Component } from 'react';
import { withModalContext } from 'ricos-modals';
import type { ModalContextValue } from 'ricos-modals';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import { PollPresetSelector } from '../settings/preset-selector/PollPresetSelector.jsx';
import { POLL_TYPE, pollModals } from '../../types';

interface Props {
  context: ModalContextValue;
  giphySdkApiKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
}

class InsertModal extends Component<Props> {
  closeModal = () => {
    this.props.context.ModalService?.closeModal(pollModals.insert);
  };

  onPollAdd = poll => {
    const {
      context: { getEditorCommands },
    } = this.props;
    const editorCommands = getEditorCommands();
    const data = convertBlockDataToRicos(POLL_TYPE, poll);
    editorCommands?.insertBlock(POLL_TYPE, data);
    this.closeModal();
  };

  render() {
    const {
      componentData,
      context: { theme, t, isMobile },
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

export default withModalContext(InsertModal);
