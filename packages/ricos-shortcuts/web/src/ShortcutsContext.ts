import React from 'react';
import { EditorKeyboardShortcuts } from './editor-keyboard-shortcuts';
import { italicShortcut, boldShortcut } from './formatting-shortcuts';

const shortcuts = new EditorKeyboardShortcuts();
shortcuts.register(italicShortcut);
shortcuts.register(boldShortcut);

export const ShortcutsContext = React.createContext({ shortcuts });
