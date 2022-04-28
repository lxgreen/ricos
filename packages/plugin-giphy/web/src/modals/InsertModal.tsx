import React, { Component } from 'react';
import { GIPHY_TYPE } from '../types';
import { withModalContext } from 'ricos-modals';
import type { ModalContextValue } from 'ricos-modals';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import GiphyApiInputModal from '../toolbar/giphyApiInputModal';
import type { Helpers } from 'wix-rich-content-common';

interface Props {
  context: ModalContextValue;
  giphySdkApiKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
  helpers?: Helpers;
}

class InsertModal extends Component<Props> {
  closeModal = () => {
    this.props.context.ModalService?.closeModal('gifModal');
  };

  onGifAdd = gif => {
    const { context, componentData, nodeId } = this.props;
    const editorCommands = context.getEditorCommands();
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
      context: { theme, t, isMobile, languageDir },
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

export default withModalContext(InsertModal);
