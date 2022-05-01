import type { EditorCommands, KeyboardShortcut, TranslationFunction } from 'ricos-types';
import type { LocalizedDisplayData, Shortcut } from '../models/shortcuts';
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
  private createKeyCombinationText() {
    return this.keys.toString();
  }

  getKeyboardShortcut() {
    return this.shortcut;
  }

  getKeys(): Keys {
    return this.keys;
  }

  getCommand(): (commands: EditorCommands) => void {
    return this.shortcut.command;
  }

  isEnabled(): boolean {
    return this.shortcut.enabled;
  }

  getName() {
    return this.shortcut.name;
  }

  getGroup(): string {
    return this.shortcut.group;
  }

  getDisplayData(t: TranslationFunction): LocalizedDisplayData {
    return {
      name: t(this.shortcut.name),
      description: t(this.shortcut.description),
      group: t(this.shortcut.group),
      keyCombinationText: this.shortcut.keyCombinationText || this.createKeyCombinationText(),
    };
  }

  configure(config: Partial<KeyboardShortcut>): EditorKeyboardShortcut {
    return new EditorKeyboardShortcut({ ...this.shortcut, ...config });
  }

  equals(shortcut: Shortcut): boolean {
    return this.keys.equals(shortcut.getKeys()) && this.getGroup() === shortcut.getGroup();
  }
}
