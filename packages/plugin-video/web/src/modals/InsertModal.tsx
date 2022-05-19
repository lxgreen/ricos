import React, { useContext } from 'react';
import type { FC } from 'react';
import { VIDEO_TYPE } from '../types';
import { videoModals } from '../constants';
import VideoInsertModal from '../toolbar/NewVideoInsertModal';
import { withModalContext } from 'ricos-modals';
import { withRicosContext } from 'wix-rich-content-editor-common';
import { withTiptapEditorContext } from 'wix-tiptap-editor';
import type { ModalContextValue } from 'ricos-modals';
import type { Helpers } from 'wix-rich-content-common';
import type { GeneralContext } from 'ricos-types';
import { UploadServiceContext } from 'wix-rich-content-common';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import type { RichContentAdapter } from 'wix-tiptap-editor';
interface Props {
  context: ModalContextValue;
  ricosContext: GeneralContext;
  editor: RichContentAdapter;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  componentData: Record<string, any>;
  nodeId?: string;
  helpers?: Helpers;
  enableCustomUploadOnMobile?: boolean;
  getVideoUrl: (src) => string;
  handleFileSelection: (updateEntity) => void;
  handleFileUpload: (files, updateEntity) => void;
}

const InsertModal: FC<Props> = ({
  context: { modalService },
  ricosContext: { theme, t, isMobile, languageDir },
  editor: { getEditorCommands },
  nodeId,
  componentData,
  handleFileSelection,
  handleFileUpload,
}) => {
  const { uploadService, updateService } = useContext(UploadServiceContext);
  const closeModal = () => {
    modalService.closeModal(videoModals.insert);
  };

  const onConfirm = video => {
    const data = convertBlockDataToRicos(VIDEO_TYPE, video);
    const nodeId = getEditorCommands().insertBlock(VIDEO_TYPE, data);
    return { newBlock: { key: nodeId } };
  };

  const onReplace = video => {
    const data = convertBlockDataToRicos(VIDEO_TYPE, video);
    nodeId && getEditorCommands().setBlock(nodeId, VIDEO_TYPE, data);
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
    />
  );
};

export default withRicosContext()(withModalContext(withTiptapEditorContext(InsertModal)));
