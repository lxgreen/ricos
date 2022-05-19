import type { FC } from 'react';
import React, { useContext } from 'react';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import { ModalContext } from 'ricos-modals';
import { RicosContext } from 'wix-rich-content-editor-common';
import { pollModals, POLL_TYPE } from '../../types';
import { PollPresetSelector } from '../settings/preset-selector/PollPresetSelector.jsx';
import { TiptapEditorContext } from 'wix-tiptap-editor';

interface Props {
  componentData: Record<string, unknown>;
}

const PollsInsertModal: FC<Props> = ({ componentData }) => {
  const { theme, t, isMobile } = useContext(RicosContext);
  const { getEditorCommands } = useContext(TiptapEditorContext);
  const { modalService } = useContext(ModalContext) || {};

  const closeModal = () => {
    modalService.closeModal(pollModals.insert);
  };

  const onPollAdd = poll => {
    const editorCommands = getEditorCommands();
    const data = convertBlockDataToRicos(POLL_TYPE, poll);
    editorCommands?.insertBlock(POLL_TYPE, data);
    closeModal();
  };

  return (
    <PollPresetSelector
      componentData={componentData}
      theme={theme}
      t={t}
      isMobile={isMobile}
      onPollAdd={onPollAdd}
      closeModal={closeModal}
    />
  );
};

export default PollsInsertModal;
