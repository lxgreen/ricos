import React, { useContext, useEffect, useState } from 'react';
import type { FC } from 'react';
import { ModalContext } from 'ricos-modals';
import ImageSettings from '../toolbar/image-settings';
import { IMAGE_TYPE } from '../types';
import { imageModals } from '../consts';
import { RicosContext, EditorContext } from 'ricos-context';
import { draftBlockDataToTiptap, tiptapNodeDataToDraft } from '../darft-convertors';

interface Props {
  nodeId: string;
}

const ImageSettingsModal: FC<Props> = ({ nodeId }) => {
  const { theme, t, isMobile, languageDir, experiments } = useContext(RicosContext);
  const { modalService } = useContext(ModalContext) || {};
  const { getEditorCommands } = useContext(EditorContext);
  const componentData = tiptapNodeDataToDraft(getEditorCommands().getBlockComponentData(nodeId));

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [initialData, setInitialData] = useState<Record<string, any>>();

  useEffect(() => {
    setInitialData(componentData);
  }, []);

  const updateData = data => {
    getEditorCommands().setBlock(nodeId, IMAGE_TYPE, {
      ...draftBlockDataToTiptap({ ...componentData, ...data }),
      id: nodeId,
    });
  };

  const closeModal = () => {
    modalService.closeModal(imageModals.settings);
  };

  const onCancel = () => {
    updateData(initialData);
    closeModal();
  };

  return (
    <ImageSettings
      componentData={componentData}
      helpers={{}}
      experiments={experiments}
      theme={theme}
      t={t}
      isMobile={isMobile}
      languageDir={languageDir}
      onCloseRequested={closeModal}
      updateData={updateData}
      shouldShowSpoiler
      onSave={closeModal}
      onCancel={onCancel}
    />
  );
};

export default ImageSettingsModal;
