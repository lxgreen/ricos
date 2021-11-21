import { duplicate } from './duplicate';
import migrationContent from '../../../../../e2e/tests/fixtures/migration-content.json';
import { fromDraft } from '../converters/draft';
import { compare } from '..';

describe('duplicate', () => {
  const content = fromDraft(migrationContent);
  const newContent = duplicate(content);
  it('should duplicate content', () => {
    expect(compare(newContent, content, { ignoredKeys: ['id'] })).toStrictEqual({});
  });
  it('should not duplicate content id', () => {
    expect(content.metadata?.id).toBeTruthy();
    expect(newContent.metadata?.id).toBeTruthy();
    expect(newContent.metadata?.id).not.toStrictEqual(content.metadata?.id);
  });
});
