import type { EditorCommands, KeyboardShortcut } from 'ricos-types';

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
