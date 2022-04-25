import type { EditorCommands, KeyboardShortcut, ShortcutContext } from 'ricos-types';
import type { Shortcut, Shortcuts } from '../models/shortcuts';
import { Keys } from './keys';

export class EditorKeyboardShortcut implements Shortcut {
  shortcut: KeyboardShortcut;

  keys: Keys;

  static of(shortcut: KeyboardShortcut) {
    return new EditorKeyboardShortcut(shortcut);
  }

  private constructor(shortcut: KeyboardShortcut) {
    this.shortcut = shortcut;
    this.keys = Keys.parse(shortcut.keys);
  }

  // TODO: generate locale/platform-dependent hint
  private createTooltipHint(keys: KeyboardShortcut['keys']) {
    return keys;
  }

  getKeyboardShortcut() {
    return this.shortcut;
  }

  getKeys(): string {
    return this.keys.toString();
  }

  getCommand(): (commands: EditorCommands) => void {
    return this.shortcut.command;
  }

  getContexts(): ShortcutContext[] {
    return this.shortcut.contexts;
  }

  isEnabled(): boolean {
    return this.shortcut.enabled;
  }

  getTooltipHint() {
    return this.shortcut.tooltipHint || this.createTooltipHint(this.shortcut.keys);
  }

  configure(config: Partial<KeyboardShortcut>): EditorKeyboardShortcut {
    return new EditorKeyboardShortcut({ ...this.shortcut, ...config });
  }
}

export class ShortcutCollisionError extends Error {}

export class EditorKeyboardShortcuts implements Shortcuts {
  private readonly shortcuts: Shortcut[];

  constructor(shortcuts: Shortcut[] = []) {
    this.shortcuts = shortcuts;
  }

  // TODO: validate vs browser built-in shortcuts
  private isDuplicate(shortcut: KeyboardShortcut) {
    return this.shortcuts
      .map(shortcut => shortcut.getKeys())
      .includes(Keys.parse(shortcut.keys).toString());
  }

  register(shortcut: KeyboardShortcut) {
    if (this.isDuplicate(shortcut)) {
      throw new ShortcutCollisionError(`the shortcut ${shortcut.keys} already defined`);
    }

    return new EditorKeyboardShortcuts([...this.shortcuts, EditorKeyboardShortcut.of(shortcut)]);
  }

  unregister(shortcut: KeyboardShortcut) {
    return this.filter(s => s.getKeyboardShortcut().keys !== shortcut.keys);
  }

  filter(predicate: (shortcut: Shortcut) => boolean) {
    return new EditorKeyboardShortcuts(this.shortcuts.filter(predicate));
  }

  asArray() {
    return this.shortcuts;
  }
}
