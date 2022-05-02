import React, { Component } from 'react';
import { GIPHY_TYPE, gifModals } from '../types';
import { withModalContext } from 'ricos-modals';
import { withRicosContext } from 'wix-rich-content-editor-common';
import type { ModalContextValue } from 'ricos-modals';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import GiphyApiInputModal from '../toolbar/giphyApiInputModal';
import type { Helpers } from 'wix-rich-content-common';
import type { GeneralContext } from 'ricos-types';

interface Props {
  context: ModalContextValue;
  ricosContext: GeneralContext;
  giphySdkApiKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
  helpers?: Helpers;
}

class InsertModal extends Component<Props> {
  closeModal = () => {
    this.props.context.modalService.closeModal(gifModals.insert);
  };

  onGifAdd = gif => {
    const { ricosContext, componentData, nodeId } = this.props;
    const editorCommands = ricosContext.getEditorCommands();
    const data = convertBlockDataToRicos(GIPHY_TYPE, { ...componentData, gif });
    if (nodeId) {
      editorCommands?.setBlock(GIPHY_TYPE, data);
    } else {
      editorCommands?.insertBlock(GIPHY_TYPE, data);
    }
  };

  render() {
    const {
      componentData,
      giphySdkApiKey,
      ricosContext: { theme, t, isMobile, languageDir },
    } = this.props;
    return (
      <GiphyApiInputModal
        giphySdkApiKey={giphySdkApiKey}
        componentData={componentData}
        theme={theme}
        t={t}
        isMobile={isMobile}
        languageDir={languageDir}
        onGifAdd={this.onGifAdd}
        onCloseRequested={this.closeModal}
      />
    );
  }
}

export default withRicosContext()(withModalContext(InsertModal));
