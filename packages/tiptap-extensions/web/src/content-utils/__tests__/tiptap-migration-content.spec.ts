import oldMigrationContentTiptap from './oldMigrationContentTiptap.json';
import migrationContentTiptap from './migrationContentTiptap.json';
import { compare } from 'ricos-content/src/comparision/compare';

// eslint-disable-next-line mocha/no-skipped-tests
describe.skip('tiptap migration content (regression test)', () => {
  it('should convert content (legacy)', () => {
    const actual = migrationContentTiptap;
    const expected = oldMigrationContentTiptap;
    expect(
      compare(actual, expected, {
        ignoredKeys: ['documentStyle', 'type', 'id'],
      })
    ).toEqual({});
  });
});
