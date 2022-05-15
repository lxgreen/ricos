import type { FC } from 'react';
import React from 'react';
import type { ModalContextValue } from 'ricos-modals';
import { withModalContext } from 'ricos-modals';
import type { GeneralContext, TranslationFunction } from 'ricos-types';
import type { RichContentTheme } from 'wix-rich-content-common';
import { withRicosContext } from 'wix-rich-content-editor-common';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { withTiptapEditorContext } from 'wix-tiptap-editor';
import EmojiPreviewModal from '../toolbar/emojiPreviewModal';
import { emojiModals } from '../types';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
  context: ModalContextValue;
  ricosContext: GeneralContext;
  editor: RichContentAdapter;
}

const EmojiInsertModal: FC<Props> = ({
  context: { modalService },
  ricosContext: { theme, t },
  editor: { getEditorCommands },
}) => {
  const closeModal = () => {
    modalService?.closeModal(emojiModals.insert);
  };

  const onEmojiAdd = emoji => {
    getEditorCommands()?.insertText(emoji);
    closeModal();
  };

  return <EmojiPreviewModal onAdd={onEmojiAdd} theme={theme} t={t} />;
};

export default withRicosContext()(withModalContext(withTiptapEditorContext(EmojiInsertModal)));
