import type { EditorCommands, KeyboardShortcut } from 'ricos-types';

export const italicShortcut: KeyboardShortcut = {
  name: 'Italic',
  description: 'Toggles italic style of selected text',
  keys: 'Control+I',
  command(editorCommands: EditorCommands) {
    editorCommands.toggleInlineStyle('italic');
  },
  group: 'formatting',
  keyCombinationText: 'Ctrl+I',
  enabled: true,
};
