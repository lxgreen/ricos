import React, { useContext } from 'react';
import type { FC } from 'react';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import { ModalContext } from 'ricos-modals';
import { RicosContext, EditorContext } from 'ricos-context';
import VerticalEmbedInsertModal from '../toolbar/VerticalEmbedInsertModal';
import { verticalEmbedModals } from '../constants';
import { VERTICAL_EMBED_TYPE } from '../types';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  verticalsApi: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
}

const InsertModal: FC<Props> = ({ componentData, verticalsApi, nodeId }) => {
  const { locale, t, isMobile, experiments } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorContext);
  const { modalService } = useContext(ModalContext) || {};
  const closeModal = () => {
    modalService.closeModal(verticalEmbedModals.insert);
  };

  const onConfirm = verticalEmbed => {
    const editorCommands = getEditorCommands();
    const data = convertBlockDataToRicos(VERTICAL_EMBED_TYPE, verticalEmbed);
    if (nodeId) {
      editorCommands?.setBlock(nodeId, VERTICAL_EMBED_TYPE, data);
    } else {
      editorCommands?.insertBlock(VERTICAL_EMBED_TYPE, data);
    }
    closeModal();
  };

  return (
    <VerticalEmbedInsertModal
      componentData={componentData}
      t={t}
      isMobile={isMobile}
      locale={locale}
      verticalsApi={verticalsApi}
      onConfirm={onConfirm}
      experiments={experiments}
      onCloseRequested={closeModal}
    />
  );
};

export default InsertModal;
