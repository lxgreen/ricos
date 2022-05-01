import React from 'react';
import { EditorKeyboardShortcuts } from './editor-keyboard-shortcuts';

const shortcuts = new EditorKeyboardShortcuts();

export const ShortcutsContext = React.createContext({ shortcuts });
