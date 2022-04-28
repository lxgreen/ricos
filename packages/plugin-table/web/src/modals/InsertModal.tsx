import React, { Component } from 'react';
import { tableModals } from '../types';
import { withModalContext } from 'ricos-modals';
import type { ModalContextValue } from 'ricos-modals';
import TableSettingsModal from '../toolbar/tableSettingsModal';

interface Props {
  context: ModalContextValue;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
}

class InsertModal extends Component<Props> {
  closeModal = () => {
    this.props.context.ModalService?.closeModal(tableModals.insert);
  };

  onTableAdd = table => {
    this.closeModal();
  };

  render() {
    const {
      componentData,
      context: { theme, t, isMobile },
    } = this.props;
    return (
      <TableSettingsModal
        componentData={componentData}
        theme={theme}
        t={t}
        isMobile={isMobile}
        onTableAdd={this.onTableAdd}
        onCloseRequested={this.closeModal}
      />
    );
  }
}

export default withModalContext(InsertModal);
