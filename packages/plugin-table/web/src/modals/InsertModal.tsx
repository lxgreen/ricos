import React, { Component } from 'react';
import { tableModals } from '../types';
import { withModalContext } from 'ricos-modals';
import { withRicosContext } from 'wix-rich-content-editor-common';
import type { ModalContextValue } from 'ricos-modals';
import TableSettingsModal from '../toolbar/tableSettingsModal';
import type { GeneralContext } from 'ricos-types';

interface Props {
  ricosContext: GeneralContext;
  context: ModalContextValue;
  componentData: Record<string, unknown>;
}

class InsertModal extends Component<Props> {
  closeModal = () => {
    this.props.context.modalService.closeModal(tableModals.insert);
  };

  onTableAdd = table => {
    this.closeModal();
  };

  render() {
    const {
      componentData,
      ricosContext: { theme, t, isMobile },
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

export default withRicosContext()(withModalContext(InsertModal));
