import React from 'react';
import { EditorKeyboardShortcuts } from './editor-keyboard-shortcuts';
import { italicShortcut } from './formatting-shortcuts';

const shortcuts = new EditorKeyboardShortcuts();
shortcuts.register(italicShortcut);

export const ShortcutsContext = React.createContext({ shortcuts });
