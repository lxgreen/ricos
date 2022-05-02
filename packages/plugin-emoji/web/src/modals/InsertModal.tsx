import React from 'react';
import { emojiModals } from '../types';
import EmojiPreviewModal from '../toolbar/emojiPreviewModal';
import { withRicosContext } from 'wix-rich-content-editor-common';
import { withModalContext } from 'ricos-modals';
import type { FC } from 'react';
import type { RichContentTheme } from 'wix-rich-content-common';
import type { TranslationFunction, GeneralContext } from 'ricos-types';
import type { ModalContextValue } from 'ricos-modals';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
  context: ModalContextValue;
  ricosContext: GeneralContext;
}

const EmojiInsertModal: FC<Props> = ({
  context: { modalService },
  ricosContext: { theme, t, getEditorCommands },
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

export default withRicosContext()(withModalContext(EmojiInsertModal));
