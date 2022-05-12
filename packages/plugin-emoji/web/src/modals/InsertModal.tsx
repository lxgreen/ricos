import React from 'react';
import { emojiModals } from '../types';
import EmojiPreviewModal from '../toolbar/emojiPreviewModal';
import { withEditorCommands, withRicosContext } from 'wix-rich-content-editor-common';
import { withModalContext } from 'ricos-modals';
import type { FC } from 'react';
import type { RichContentTheme } from 'wix-rich-content-common';
import type { TranslationFunction, GeneralContext } from 'ricos-types';
import type { ModalContextValue } from 'ricos-modals';
import type { EditorContextValue } from 'wix-rich-content-editor-common';

interface Props {
  theme: RichContentTheme;
  t: TranslationFunction;
  context: ModalContextValue;
  ricosContext: GeneralContext;
  editorCommandsContext: EditorContextValue;
}

const EmojiInsertModal: FC<Props> = ({
  context: { modalService },
  ricosContext: { theme, t },
  editorCommandsContext,
}) => {
  const closeModal = () => {
    modalService?.closeModal(emojiModals.insert);
  };

  const onEmojiAdd = emoji => {
    editorCommandsContext.getEditorCommands()?.insertText(emoji);
    closeModal();
  };

  return <EmojiPreviewModal onAdd={onEmojiAdd} theme={theme} t={t} />;
};

export default withRicosContext()(withModalContext(withEditorCommands()(EmojiInsertModal)));
