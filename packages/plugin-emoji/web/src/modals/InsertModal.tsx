import type { FC } from 'react';
import React, { useContext } from 'react';
import { ModalContext } from 'ricos-modals';
import { RicosContext } from 'wix-rich-content-editor-common';
import { TiptapEditorContext } from 'wix-tiptap-editor';
import EmojiPreviewModal from '../toolbar/emojiPreviewModal';
import { emojiModals } from '../types';

interface Props {}

const EmojiInsertModal: FC<Props> = () => {
  const { theme, t } = useContext(RicosContext);
  const { getEditorCommands } = useContext(TiptapEditorContext);
  const { modalService } = useContext(ModalContext) || {};

  const closeModal = () => {
    modalService?.closeModal(emojiModals.insert);
  };

  const onEmojiAdd = emoji => {
    getEditorCommands()?.insertText(emoji);
    closeModal();
  };

  return <EmojiPreviewModal onAdd={onEmojiAdd} theme={theme} t={t} />;
};

export default EmojiInsertModal;
