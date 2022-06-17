import { identity } from 'fp-ts/function';
import type { EditorCommands, KeyboardShortcut } from 'ricos-types';
import { EditorKeyboardShortcut } from './editor-keyboard-shortcut';

describe('Editor Keyboard Shortcut', () => {
  const shortcut: KeyboardShortcut = {
    name: 'Bold',
    description: 'Toggles bold style of selected text',
    keys: 'Shift+Meta+B',
    command(editorCommands: EditorCommands) {
      editorCommands.toggleInlineStyle('bold');
    },
    group: 'formatting',
    keyCombinationText: 'Cmd+B',
    enabled: true,
  };

  const actual = EditorKeyboardShortcut.of(shortcut);
  it('should create valid instance', () => {
    expect(actual).toBeInstanceOf(EditorKeyboardShortcut);
    expect(actual.getKeys().toString()).toEqual('Meta+Shift+B');
    expect(actual.getGroup()).toEqual('formatting');
    expect(actual.getName()).toEqual('Bold');
    expect(actual.getKeyboardShortcut()).toEqual(shortcut);
    expect(actual.isEnabled()).toBeTruthy();
  });

  it('should produce valid display data', () => {});
  expect(actual.getDisplayData(identity)).toEqual({
    name: 'Bold',
    description: 'Toggles bold style of selected text',
    keyCombinationText: 'Cmd+B',
    group: 'formatting',
  });

  it('should allow reconfiguration', () => {
    const reconfigured = actual.configure({
      name: 'Underline',
      description: 'Adds underline style',
      enabled: false,
    });
    expect(reconfigured.isEnabled()).toBeFalsy();
    expect(reconfigured.getDisplayData(identity)).toEqual({
      name: 'Underline',
      description: 'Adds underline style',
      group: 'formatting',
      keyCombinationText: 'Cmd+B',
    });
  });

  it('should compare shortcuts correctly', () => {
    const reconfigured = actual.configure({
      group: 'add-plugin',
    });
    expect(reconfigured.equals(actual)).toBeFalsy();
    expect(reconfigured.equals(reconfigured)).toBeTruthy();
  });
});
