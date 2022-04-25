import type { EditorCommands } from './editorCommandsType';

export type ShortcutContext = 'formatting' | 'add-plugin' | 'plugin-settings';

/**
 * Keyboard shortcut configuration
 *
 * @export
 * @interface KeyboardShortcut
 */
export interface KeyboardShortcut {
  /**
   * The shortcut keys like Ctrl+B
   *
   * @type {string}
   * @memberof KeyboardShortcut
   */
  keys: string; // TODO: implement Keys as refined string allowing certain combinations like 'ctrl+m'
  /**
   * Command for execution
   *
   * @memberof KeyboardShortcut
   */
  command: (commands: EditorCommands) => void; // TODO: define return value type
  /**
   * Contexts the shortcut is relevant to
   *
   * @type {ShortcutContext[]}
   * @memberof KeyboardShortcut
   */
  contexts: ShortcutContext[];
  /**
   * Textual representation of key combination like 'Ctrl+B' or '⌘ B' (optional)
   *
   * @type {string}
   * @memberof KeyboardShortcut
   */
  tooltipHint?: string;
  /**
   * Enables shortcut
   *
   * @type {boolean}
   * @memberof KeyboardShortcut
   */
  enabled: boolean;
}
