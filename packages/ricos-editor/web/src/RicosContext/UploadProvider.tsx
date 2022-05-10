import React, { useContext } from 'react';
import { UploadContextWrapper } from 'ricos-common';
import { RicosContext } from 'wix-rich-content-editor-common';

export const UploadProvider = ({ children, helpers }) => {
  const { getEditorCommands, isMobile, locale } = useContext(RicosContext);

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
