import React, { useContext } from 'react';
import type { FC } from 'react';
import { VIDEO_TYPE } from '../types';
import { videoModals } from '../constants';
import VideoInsertModal from '../toolbar/NewVideoInsertModal';
import { ModalContext } from 'ricos-modals';
import { RicosContext, EditorContext } from 'ricos-context';
import { UploadServiceContext } from 'wix-rich-content-common';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
  enableCustomUploadOnMobile?: boolean;
  getVideoUrl: (src) => string;
  handleFileSelection: (updateEntity) => void;
  handleFileUpload: (files, updateEntity) => void;
}

const InsertModal: FC<Props> = ({
  nodeId,
  componentData,
  handleFileSelection,
  handleFileUpload,
}) => {
  const { theme, t, isMobile, languageDir } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorContext);
  const { modalService } = useContext(ModalContext) || {};
  const { uploadService, updateService } = useContext(UploadServiceContext);
  const closeModal = () => {
    modalService.closeModal(videoModals.insert);
  };

  const onReplace = video => {
    const data = convertBlockDataToRicos(VIDEO_TYPE, video);
    getEditorCommands().setBlock(nodeId as string, VIDEO_TYPE, data);
    return { newBlock: { key: nodeId } };
  };

  const onConfirm = video => {
    if (nodeId) {
      onReplace(video);
    } else {
      const data = convertBlockDataToRicos(VIDEO_TYPE, video);
      const nodeId = getEditorCommands().insertBlock(VIDEO_TYPE, data);
      return { newBlock: { key: nodeId } };
    }
  };

  return (
    <VideoInsertModal
      componentData={componentData}
      theme={theme}
      t={t}
      isMobile={isMobile}
      languageDir={languageDir}
      closeModal={closeModal}
      onReplace={onReplace}
      onConfirm={!nodeId && onConfirm}
      uploadService={uploadService}
      updateService={updateService}
      helpers={{}}
      handleFileSelection={handleFileSelection}
      handleFileUpload={handleFileUpload}
      blockKey={nodeId}
    />
  );
};

export default InsertModal;
