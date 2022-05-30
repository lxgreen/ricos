import { fromTiptap as legacyFrom } from 'wix-tiptap-extensions';
import { fromTiptap } from './index';
// eslint-disable-next-line max-len
import migrationContentTiptap from 'wix-tiptap-extensions/src/content-utils/__tests__/migrationContentTiptap.json';

describe('from Tiptap', () => {
  it('should convert image', () => {
    const content = {
      type: 'doc',
      attrs: {
        metadata: {
          version: 1,
          createdTimestamp: '2022-05-28T14:09:10.655Z',
          updatedTimestamp: '2022-05-28T14:09:10.655Z',
          id: '1dda5bc8-0920-4ccd-b4b3-331bcda058f9',
        },
      },
      content: [
        {
          type: 'image',
          content: [],
          attrs: {
            id: 'foo',
            containerData: {
              width: {
                size: 'SMALL',
              },
              alignment: 'LEFT',
              textWrap: true,
            },
            image: {
              src: {
                id: '8bb438_e353d9a6ec324041a17a28d10e21819d.jpg',
              },
              width: 5600,
              height: 3727,
            },
          },
        },
      ],
      documentStyle: {},
    };

    const expected = legacyFrom(content);
    const actual = fromTiptap(content);
    expect(actual).toStrictEqual(expected);
  });
  // TODO: rethink tiptap content (will fix fromTiptap test)
  // eslint-disable-next-line mocha/no-skipped-tests
  it.skip('should convert content', () => {
    const actual = fromTiptap(migrationContentTiptap);
    // TODO: implement document style converter
    const expected = { ...legacyFrom(migrationContentTiptap), documentStyle: {} };
    expect(actual).toEqual(expected);
  });
});
