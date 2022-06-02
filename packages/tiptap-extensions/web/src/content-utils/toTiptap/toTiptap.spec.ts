import type { ImageData } from 'ricos-schema';
import { RichContent } from 'ricos-schema';
import { compare } from 'ricos-content/src/comparision/compare';
import migrationContent from 'ricos-content/statics/json/migratedFixtures/migration-content.json';
import draftMigrationContent from '../../../../../../e2e/tests/fixtures/migration-content.json';
import oldMigrationContentTiptap from '../__tests__/oldMigrationContentTiptap.json';
import { draftBlockDataToTiptap, draftToTiptap, toTiptap } from '../';
import { getImageBlockData, getImageNode } from '../utils';
import { IMAGE_TYPE } from 'ricos-content';

describe('convert to Tiptap', () => {
  describe('from RichContent', () => {
    const content = RichContent.fromJSON(migrationContent);
    const imageNode = getImageNode(content);

    it('should convert content', () => {
      const proseDocument = toTiptap(content);
      expect(compare(proseDocument, oldMigrationContentTiptap, { ignoredKeys: ['id'] })).toEqual(
        {}
      );
    });
    it('should convert node', () => {
      const proseNode = toTiptap(imageNode);
      expect(
        compare(proseNode, getImageNode(oldMigrationContentTiptap), { ignoredKeys: ['id'] })
      ).toEqual({});
    });
    it('should convert node data', () => {
      const nodeData = toTiptap(imageNode.imageData as ImageData);
      expect(
        compare(nodeData, getImageNode(oldMigrationContentTiptap).attrs, {
          ignoredKeys: ['id'],
        })
      ).toEqual({});
    });
  });
  describe('from Draft', () => {
    it('should convert content', () => {
      const proseDocument = draftToTiptap(draftMigrationContent);
      expect(compare(proseDocument, oldMigrationContentTiptap, { ignoredKeys: ['id'] })).toEqual(
        {}
      );
    });
    it('should convert node data', () => {
      const imageData = getImageBlockData(draftMigrationContent);
      const proseData = draftBlockDataToTiptap(IMAGE_TYPE, imageData);
      expect(
        compare(proseData, getImageNode(oldMigrationContentTiptap).attrs, { ignoredKeys: ['id'] })
      ).toEqual({});
    });
  });
});
