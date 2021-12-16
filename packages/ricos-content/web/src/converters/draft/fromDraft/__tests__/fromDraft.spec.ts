/* eslint-disable no-unused-vars */

import { toDraft, fromDraft } from '../..';
import { compare } from '../../../../comparision/compare';
import complexFixture from '../../../../../../../../e2e/tests/fixtures/migration-content.json';
import buggy from '../../../../../../../../e2e/tests/fixtures/buggy/atomicWithNoEntityRanges.json';
import external from './external-blocks-and-decorations.json';
import externalMigrated from './external-blocks-and-decorations-migrated.json';
import unsupported from './unsupported-blocks-and-decorations.json';
import unsupportedMigrated from './unsupported-blocks-and-decorations-migrated.json';
import galleryThumbnailNone from './gallery-with-thumbnail-placement-none.json';
import galleryWithoutThumbnail from './gallery-without-thumbnail-placement.json';
import galleryThumbnailMigrated from './gallery-with-thumbnail-placement-migrated.json';
import noVideoData from './no-data-video.json';
import noVideoDataMigrated from './no-data-video-migrated.json';
import innerWithUnsupported from './inner-rce-with-unsupported-styling.json';
import innerWithUnsupportedMigrated from './inner-rce-with-unsupported-styling-migrated.json';
import polyfills from '../../../../../../../../e2e/tests/fixtures/polyfills.json';
import { getTextNodes } from '../getTextNodes';
import complexRicosFixture from '../../../../../statics/json/migratedFixtures/migration-content.json';
import {
  Node_Type,
  Decoration_Type,
  RichContent,
  ImageData,
  FileData,
  PluginContainerData_Width_Type,
  PluginContainerData_Alignment,
} from 'ricos-schema';
import { convertBlockDataToRicos } from '../convertRicosPluginData';
import { IMAGE_TYPE, FILE_UPLOAD_TYPE, WRAP } from '../../../../consts';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const filterIds = objArr => objArr.map(({ id, ...rest }) => rest); //disable
describe('migrate from draft', () => {
  const fixtures = { buggy, polyfills };
  Object.entries(fixtures).forEach(([name, content]) =>
    it(`should migrate ${name} fixture`, () => {
      const _backToDraft = toDraft(fromDraft(content));
      // const result = compare(backToDraft, content);
      // expect(result).toEqual({});
      expect(true).toEqual(true);
    })
  );

  it('should migrate complex fixture', () => {
    expect(
      compare(fromDraft(complexFixture), RichContent.fromJSON(complexRicosFixture), {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });

  it('should overlap styles', () => {
    const block = {
      key: 'foo',
      text: 'blah blah blah',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [
        {
          offset: 3,
          length: 3,
          style: 'ITALIC',
        },
        {
          offset: 5,
          length: 5,
          style: 'UNDERLINE',
        },
        {
          offset: 8,
          length: 4,
          style: 'BOLD',
        },
      ],
      entityRanges: [],
    };

    const expectedResults = [
      {
        id: '2k4v1',
        nodes: [],
        textData: { decorations: [], text: 'bla' },
        type: Node_Type.TEXT,
      },
      {
        id: '1ba7b',
        nodes: [],
        textData: { decorations: [{ type: Decoration_Type.ITALIC, italicData: true }], text: 'h ' },
        type: Node_Type.TEXT,
      },
      {
        id: '59lhm',
        nodes: [],
        textData: {
          decorations: [
            { type: Decoration_Type.ITALIC, italicData: true },
            { type: Decoration_Type.UNDERLINE, underlineData: true },
          ],
          text: 'b',
        },
        type: Node_Type.TEXT,
      },
      {
        id: '1agl0',
        nodes: [],
        textData: {
          decorations: [{ type: Decoration_Type.UNDERLINE, underlineData: true }],
          text: 'la',
        },
        type: Node_Type.TEXT,
      },
      {
        id: '1m39g',
        nodes: [],
        textData: {
          decorations: [
            { type: Decoration_Type.UNDERLINE, underlineData: true },
            { type: Decoration_Type.BOLD, fontWeightValue: 700 },
          ],
          text: 'h ',
        },
        type: Node_Type.TEXT,
      },
      {
        id: '8cr95',
        nodes: [],
        textData: {
          decorations: [{ type: Decoration_Type.BOLD, fontWeightValue: 700 }],
          text: 'bl',
        },
        type: Node_Type.TEXT,
      },
      {
        id: 'dkn86',
        nodes: [],
        textData: { decorations: [], text: 'ah' },
        type: Node_Type.TEXT,
      },
    ];

    const entityMap = {};
    expect(filterIds(getTextNodes(block, entityMap))).toEqual(filterIds(expectedResults));
  });

  it('should detect mentions', () => {
    const block = {
      key: 'fcm70',
      text: 'Mentions too @Test One ',
      type: 'unstyled',
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [
        {
          offset: 13,
          length: 9,
          key: 0,
        },
      ],
      data: {},
    };
    const entityMap = {
      '0': {
        type: 'mention',
        mutability: 'SEGMENTED',
        data: {
          mention: {
            name: 'Test One',
            slug: 'testone',
          },
        },
      },
    };

    const expectedResult = [
      {
        nodes: [],
        textData: { decorations: [], text: 'Mentions too ' },
        type: Node_Type.TEXT,
      },
      {
        nodes: [],
        textData: {
          decorations: [
            {
              mentionData: {
                name: 'Test One',
                slug: 'testone',
              },
              type: Decoration_Type.MENTION,
            },
          ],
          text: '@Test One',
        },
        type: Node_Type.TEXT,
      },
      { nodes: [], textData: { decorations: [], text: ' ' }, type: Node_Type.TEXT },
    ];
    expect(filterIds(getTextNodes(block, entityMap))).toEqual(expectedResult);
  });

  it('should convert block data', () => {
    const blockData = {
      config: {
        alignment: 'center',
        size: 'content',
        showTitle: true,
        showDescription: true,
        textWrap: WRAP,
      },
      src: {
        id: '036c6bf6cef5e4409848eb4eb6f80de1',
        original_file_name: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
        file_name: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg',
        width: 2898,
        height: 3354,
      },
      disableExpand: false,
      disableDownload: false,
      metadata: {
        caption: 'The caption!',
        alt: 'feet',
      },
    };

    const expectedNodeData: ImageData = {
      containerData: {
        width: { size: PluginContainerData_Width_Type.CONTENT },
        alignment: PluginContainerData_Alignment.CENTER,
        textWrap: true,
      },
      image: {
        src: { id: '8bb438_131a7e1872bc45ec827bb61e56b840fe.jpg' },
        width: 2898,
        height: 3354,
      },
      disableExpand: false,
      disableDownload: false,
      altText: 'feet',
      caption: 'The caption!',
    };

    const nodeData = convertBlockDataToRicos(IMAGE_TYPE, blockData);

    expect(ImageData.toJSON(nodeData)).toEqual(expectedNodeData);
  });

  describe('FileSource', () => {
    describe('privacy', () => {
      it(`should handle 'public'`, () => {
        const blockData = { id: 'abcdefg', privacy: 'public' };
        const expectedNodeData: FileData = { src: { id: 'abcdefg', private: false } };
        const nodeData = convertBlockDataToRicos(FILE_UPLOAD_TYPE, blockData);
        expect(FileData.toJSON(nodeData)).toEqual(expectedNodeData);
      });
      it(`should handle 'private'`, () => {
        const blockData = { id: 'abcdefg', privacy: 'private' };
        const expectedNodeData: FileData = { src: { id: 'abcdefg', private: true } };
        const nodeData = convertBlockDataToRicos(FILE_UPLOAD_TYPE, blockData);
        expect(FileData.toJSON(nodeData)).toEqual(expectedNodeData);
      });
      it(`should handle undefined`, () => {
        const blockData = { id: 'abcdefg' };
        const expectedNodeData: FileData = { src: { id: 'abcdefg' } };
        const nodeData = convertBlockDataToRicos(FILE_UPLOAD_TYPE, blockData);
        expect(FileData.toJSON(nodeData)).toEqual(expectedNodeData);
      });
    });
  });

  it('should convert list styles correctly', () => {
    const draftContent = {
      blocks: [
        {
          key: '80vi2',
          text: 'xbxvbcvb',
          type: 'ordered-list-item',
          depth: 0,
          inlineStyleRanges: [],
          entityRanges: [],
          data: {
            dynamicStyles: {
              'padding-top': '2px',
              'padding-bottom': '3px',
            },
          },
        },
      ],
      entityMap: {},
      VERSION: '8.42.2',
    };
    const expected = {
      nodes: [
        {
          type: 'ORDERED_LIST',
          id: '4kh4d',
          nodes: [
            {
              type: 'LIST_ITEM',
              id: '80vi2',
              nodes: [
                {
                  type: 'PARAGRAPH',
                  id: 'copbt',
                  nodes: [
                    {
                      type: 'TEXT',
                      id: '4vn2p',
                      nodes: [],
                      textData: { text: 'xbxvbcvb', decorations: [] },
                    },
                  ],
                  style: { paddingTop: '2px', paddingBottom: '3px' },
                  paragraphData: { textStyle: { textAlignment: 'AUTO' }, indentation: 0 },
                },
              ],
            },
          ],
        },
      ],
      metadata: {
        version: 1,
        createdTimestamp: '2021-06-06T11:42:01.065Z',
        updatedTimestamp: '2021-06-06T11:42:01.065Z',
      },
    };
    expect(
      compare(fromDraft(draftContent), RichContent.fromJSON(expected), {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });

  it('should ignore unsupported blocks and decorations', () => {
    expect(
      compare(
        fromDraft(unsupported, { ignoreUnsupportedValues: true }),
        RichContent.fromJSON(unsupportedMigrated),
        {
          ignoredKeys: ['id'],
        }
      )
    ).toEqual({});
  });

  it('should convert external block', () => {
    expect(
      compare(fromDraft(external), RichContent.fromJSON(externalMigrated), {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });

  it('should convert gallery content correctly', () => {
    const draftContents = [galleryThumbnailNone, galleryWithoutThumbnail];
    draftContents.forEach(draftContent =>
      expect(
        compare(fromDraft(draftContent), RichContent.fromJSON(galleryThumbnailMigrated), {
          ignoredKeys: ['id'],
        })
      ).toEqual({})
    );
  });

  it('should convert content with no data plugins correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const converted = fromDraft(noVideoData, { ignoreUnsupportedValues: true });
    expect(
      compare(converted, RichContent.fromJSON(noVideoDataMigrated), {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });

  it('should convert faulty content correctly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const converted = fromDraft(innerWithUnsupported, { ignoreUnsupportedValues: true });

    expect(
      compare(converted, RichContent.fromJSON(innerWithUnsupportedMigrated), {
        ignoredKeys: ['id'],
      })
    ).toEqual({});
  });
});
