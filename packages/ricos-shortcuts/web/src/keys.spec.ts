import type { BasicKeyCombination } from 'ricos-types';
import { Keys } from './keys';

describe('Keys', () => {
  it('should parse valid keys combination', () => {
    const actual = Keys.parse('Shift+Meta+Z').toString();
    expect(actual).toEqual('Meta+Shift+Z');
  });

  it('should fallback to F20 on invalid keys', () => {
    ['bad', '', 'Shift+Alt', 'Z+', 'Control+A+', 'Alt+Test'].forEach(
      (keys: BasicKeyCombination) => {
        const actual = Keys.parse(keys).toString();
        expect(actual).toEqual('F20');
      }
    );
  });

  it('should stringify keys', () => {
    ['Control+A', '?', 'Alt+Tab', 'Shift+Enter', 'Alt+Control+S'].forEach(
      (keys: BasicKeyCombination) => expect(Keys.parse(keys).toString()).toEqual(keys)
    );
    expect(Keys.parse('Meta+Alt+B').toString()).toEqual('Alt+Meta+B');
  });
});
