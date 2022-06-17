import React, { useContext } from 'react';
import { UploadContextWrapper } from 'ricos-common';
import { RicosContext, EditorContext } from 'ricos-context';

export const UploadProvider = ({ children, helpers }) => {
  const { isMobile, locale } = useContext(RicosContext);
  const { getEditorCommands } = useContext(EditorContext);

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
