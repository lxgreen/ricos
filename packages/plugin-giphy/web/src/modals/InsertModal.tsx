import React, { Component } from 'react';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import type { ModalContextValue } from 'ricos-modals';
import { withModalContext } from 'ricos-modals';
import type { GeneralContext } from 'ricos-types';
import type { Helpers } from 'wix-rich-content-common';
import { withRicosContext } from 'wix-rich-content-editor-common';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { withTiptapEditorContext } from 'wix-tiptap-editor';
import GiphyApiInputModal from '../toolbar/giphyApiInputModal';
import { gifModals, GIPHY_TYPE } from '../types';

interface Props {
  context: ModalContextValue;
  ricosContext: GeneralContext;
  editor: RichContentAdapter;
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
    const {
      componentData,
      nodeId,
      editor: { getEditorCommands },
    } = this.props;
    const editorCommands = getEditorCommands();
    const data = convertBlockDataToRicos(GIPHY_TYPE, { ...componentData, gif });
    if (nodeId) {
      editorCommands?.setBlock(nodeId, GIPHY_TYPE, data);
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

export default withRicosContext()(withModalContext(withTiptapEditorContext(InsertModal)));
