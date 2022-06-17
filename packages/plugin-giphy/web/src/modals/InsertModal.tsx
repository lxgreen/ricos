import React, { useContext } from 'react';
import type { FC } from 'react';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import { ModalContext } from 'ricos-modals';
import { RicosContext, EditorContext } from 'ricos-context';
import GiphyApiInputModal from '../toolbar/giphyApiInputModal';
import { gifModals, GIPHY_TYPE } from '../types';

interface Props {
  giphySdkApiKey: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
}

const GiphyInsertModal: FC<Props> = ({ componentData, giphySdkApiKey, nodeId }) => {
  const { theme, t, isMobile, languageDir } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorContext);
  const { modalService } = useContext(ModalContext) || {};
  const closeModal = () => {
    modalService.closeModal(gifModals.insert);
  };

  const onGifAdd = gif => {
    const editorCommands = getEditorCommands();
    const data = convertBlockDataToRicos(GIPHY_TYPE, { ...componentData, gif });
    if (nodeId) {
      editorCommands?.setBlock(nodeId, GIPHY_TYPE, data);
    } else {
      editorCommands?.insertBlock(GIPHY_TYPE, data);
    }
  };

  return (
    <GiphyApiInputModal
      giphySdkApiKey={giphySdkApiKey}
      componentData={componentData}
      theme={theme}
      t={t}
      isMobile={isMobile}
      languageDir={languageDir}
      onGifAdd={onGifAdd}
      onCloseRequested={closeModal}
    />
  );
};

export default GiphyInsertModal;
