import type { KeyboardShortcut } from 'ricos-types';

export interface Shortcut {
  getKeys(): KeyboardShortcut['keys'];
  getCommand(): KeyboardShortcut['command'];
  getContexts(): KeyboardShortcut['contexts'];
  getTooltipHint(): KeyboardShortcut['tooltipHint'];
  isEnabled(): KeyboardShortcut['enabled'];
  getKeyboardShortcut: () => KeyboardShortcut;
  configure(config: KeyboardShortcut): Shortcut; // runtime configuration
}

export interface Shortcuts {
  register: (shortcut: KeyboardShortcut) => Shortcuts;
  unregister: (shortcut: KeyboardShortcut) => Shortcuts;
  filter: (predicate: (shortcut: Shortcut) => boolean) => Shortcuts;
  asArray: () => Shortcut[];
}
