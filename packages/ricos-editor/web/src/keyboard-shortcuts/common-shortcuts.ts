import type { EditorCommands, KeyboardShortcut } from 'ricos-types';

export const boldShortcut: KeyboardShortcut = {
  keys: 'Cmd+B',
  command(editorCommands: EditorCommands) {
    editorCommands.toggleInlineStyle('bold');
  },
  contexts: [],
  tooltipHint: '',
  enabled: false,
};
