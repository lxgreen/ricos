import type { EditorCommands, KeyboardShortcut } from 'ricos-types';

export const boldShortcut: KeyboardShortcut = {
  name: 'Bold',
  description: 'Toggles bold style of selected text',
  keys: 'Meta+B',
  command(editorCommands: EditorCommands) {
    editorCommands.toggleInlineStyle('bold');
  },
  group: 'formatting',
  keyCombinationText: '⌘B',
  enabled: true,
};
