/* eslint-disable max-len */
import draftContent from '../../../../e2e/tests/fixtures/migration-content.json';
import migrationContent from '../../../ricos-content/web/statics/json/migratedFixtures/migration-content.json';
import oldMigrationContentTiptap from '../../../tiptap-extensions/web/src/content-utils/__tests__/oldMigrationContentTiptap.json';
import migrationContentTiptap from '../../../tiptap-extensions/web/src/content-utils/__tests__/migrationContentTiptap.json';
import { compare } from 'ricos-content/src/comparision/compare';
import { Metadata } from 'ricos-schema';
import type { RichContent } from 'ricos-schema';
import { fromTiptap as legacyFrom, toTiptap as legacyTo } from 'wix-tiptap-extensions';
import { fromTiptap, toTiptap, draftToTiptap, tiptapToDraft } from './index';

describe('Conversion regression', () => {
  it('from tiptap', () => {
    const actual = fromTiptap(migrationContentTiptap);
    const expected = legacyFrom(oldMigrationContentTiptap);
    expect(
      compare(actual, expected, {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });

  it('to tiptap', () => {
    const content = {
      ...migrationContent,
      metadata: {
        ...Metadata.fromJSON(migrationContent.metadata),
      },
    } as RichContent;
    const actual = toTiptap(content);
    const expected = legacyTo(content);
    expect(
      compare(actual, expected, {
        ignoredKeys: ['type', 'documentStyle'],
      })
    ).toEqual({});
  });

  it('draft to tiptap', () => {
    const actual = draftToTiptap(draftContent);
    const expected = migrationContentTiptap;
    expect(
      compare(actual, expected, {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });

  it('tiptap to draft', () => {
    const actual = tiptapToDraft(migrationContentTiptap);
    const expected = draftContent;
    expect(
      compare(actual, expected, {
        ignoredKeys: ['key'],
      })
    ).toEqual({});
  });
});
