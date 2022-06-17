import type { EditorCommands, KeyboardShortcut } from 'ricos-types';

export const boldShortcut: KeyboardShortcut = {
  name: 'bold',
  description: 'Toggles bold style of selected text',
  keys: 'Meta+B',
  command(editorCommands: EditorCommands) {
    editorCommands.toggleInlineStyle('bold');
  },
  group: 'formatting',
  keyCombinationText: 'Cmd+B',
  enabled: true,
};

export const italicShortcut: KeyboardShortcut = {
  name: 'Italic',
  description: 'Toggles italic style of selected text',
  keys: 'Meta+I',
  command(editorCommands: EditorCommands) {
    editorCommands.toggleInlineStyle('italic');
  },
  group: 'formatting',
  keyCombinationText: 'Cmd+I',
  enabled: true,
};
