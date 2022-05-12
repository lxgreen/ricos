import React, { useContext } from 'react';
import { UploadContextWrapper } from 'ricos-common';
import { RicosContext } from 'wix-rich-content-editor-common';
import { EditorCommandsContext } from '../RicosEditorTiptap/EditorCommandsContext';

export const UploadProvider = ({ children, helpers }) => {
  const { isMobile, locale } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorCommandsContext);

  return (
    <UploadContextWrapper
      locale={locale}
      editorCommands={getEditorCommands()}
      isMobile={isMobile}
      helpers={helpers}
    >
      {children}
    </UploadContextWrapper>
  );
};
