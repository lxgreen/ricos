import { identity, pipe } from 'fp-ts/function';
import * as O from 'fp-ts/Option';
import { getMatches } from 'ricos-content';
import { isAnyKey, isModifierKey } from 'ricos-types';
import type { AnyKey, BasicKeyCombination, ModifierKeys } from 'ricos-types';

export class KeyboardShortcutParseError extends Error {}

/**
 * Represents shortcut key combination
 *
 *
 * @export
 * @class Keys
 */
export class Keys {
  modifiers: ModifierKeys[];

  key: AnyKey;

  private static isValidKeys(key: AnyKey, modifiers: ModifierKeys[]): boolean {
    return isAnyKey(key) && !isModifierKey(key) && modifiers.filter(Boolean).every(isModifierKey);
  }

  private constructor(key: AnyKey, modifiers: ModifierKeys[] = []) {
    if (!Keys.isValidKeys(key, modifiers)) {
      throw new KeyboardShortcutParseError(
        `invalid keys combination: modifiers = ${modifiers.join('+')} | key = ${key}`
      );
    }
    this.modifiers = modifiers.filter(Boolean);
    this.key = key;
  }

  /**
   * Textual representation of parsed Keys:
   * ```ts
   *  `${modifiers}+${keys}`
   * ```
   * @memberof Keys
   */
  toString(): string {
    return `${
      this.modifiers.length > 0 ? this.modifiers.filter(Boolean).join('+').concat('+') : ''
    }${this.key}`;
  }

  equals(keys: Keys) {
    return this.toString() === keys.toString();
  }

  /**
   * Parses keys string
   *
   * Example: 'Control+B' parsed to
   * ```ts
   *  {
   *    modifiers: ['Control'],
   *    key: ['B']
   *  }
   * ```
   *
   * @param {BasicKeyCombination} keys key combination
   * @returns  {Keys} Keys instance
   * @memberof Keys
   */
  static parse(keys: BasicKeyCombination): Keys {
    return pipe(
      keys,
      getMatches(/(?:([^+]+)\+)?(?:([^+]+)\+)?(.+)/gi),
      O.map(([, modifier1, modifier2, key]: string[]) => {
        if (!Keys.isValidKeys(key, [modifier1 as ModifierKeys, modifier2 as ModifierKeys])) {
          console.error(`failed to parse "${keys}" key combination`);
          return new Keys('F20', []);
        }
        return new Keys(key, [modifier1 as ModifierKeys, modifier2 as ModifierKeys].sort());
      }),
      O.fold(() => {
        console.error(`failed to parse ${keys} key combination`);
        return new Keys('F20', []); // default keys set to F20
      }, identity)
    );
  }
}
