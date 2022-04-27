import React from 'react';
import type { ModalContextValue } from '../types';

export const ModalContext = React.createContext<ModalContextValue>({
  isMobile: false,
  theme: {},
  experiments: {},
  t: key => key,
  getEditorCommands: () => {},
  languageDir: 'ltr',
});
