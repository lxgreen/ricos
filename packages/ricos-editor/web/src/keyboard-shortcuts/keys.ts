/**
 * Represents shortcut key combination
 *
 *
 * @export
 * @class Keys
 */
export class Keys {
  keys: string;

  private constructor(keys: string) {
    this.keys = keys;
  }

  /**
   * Textual representation of parsed Keys:
   * ```ts
   *  `${modifiers}+${keys}`
   * ```
   * @memberof Keys
   */
  toString(): string {
    return this.keys;
  }

  /**
   * Parses keys string and stores combination elements like modifiers and keys
   *
   * Example: all of 'c-b', 'ctrl-B' and 'Ctrl+B' should be parsed as
   * ```ts
   *  {
   *    modifiers: ['Ctrl'],
   *    keys: ['b']
   *  }
   * ```
   *
   * @param {string} keys
   * @returns  {Keys} Keys instance
   * @memberof Keys
   */
  static parse(keys: string): Keys {
    // TODO: parse keys string by extracting modifiers and keys.
    return new Keys(keys);
  }
}
