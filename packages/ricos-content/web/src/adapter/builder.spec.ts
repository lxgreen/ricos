import {
  RichContent,
  Node_Type,
  DividerData_Alignment,
  PluginContainerData_Alignment,
  PluginContainerData_Width_Type,
  DividerData_LineStyle,
  DividerData_Width,
  TextStyle_TextAlignment,
} from 'ricos-schema';
import { compare } from 'wix-rich-content-common';
import { createBuilder } from './builder';
import { ImageElement } from './types';

const builder = createBuilder();

describe('general', () => {
  it('should chain additions', () => {
    const result = builder
      .addDivider()
      .addHeading({ text: 'Ha' })
      .get();
    const expected: RichContent = {
      nodes: [
        {
          dividerData: {
            alignment: DividerData_Alignment.CENTER,
            containerData: {
              alignment: PluginContainerData_Alignment.CENTER,
              textWrap: false,
              width: {
                size: PluginContainerData_Width_Type.CONTENT,
              },
            },
            lineStyle: DividerData_LineStyle.SINGLE,
            width: DividerData_Width.LARGE,
          },
          id: 'djpg6',
          nodes: [],
          type: Node_Type.DIVIDER,
        },
        {
          headingData: {
            indentation: 0,
            level: 2,
            textStyle: {
              textAlignment: TextStyle_TextAlignment.AUTO,
            },
          },
          id: 'ahvit',
          nodes: [
            {
              id: '',
              nodes: [],
              textData: {
                decorations: [],
                text: 'Ha',
              },
              type: Node_Type.TEXT,
            },
          ],
          type: Node_Type.HEADING,
        },
      ],
    };
    expect(compare(result, expected, { ignoredKeys: ['id'] })).toStrictEqual({});
  });
});

describe('addImage', () => {
  it('should work with URL', () => {
    const expected: RichContent = {
      nodes: [
        {
          id: '27u2t',
          imageData: {
            image: {
              src: {
                url: 'http://www.wix.com',
              },
            },
          },
          nodes: [],
          type: Node_Type.IMAGE,
        },
      ],
    };
    const result = builder.addImage({ data: 'http://www.wix.com' }).get();
    expect(compare(result, expected, { ignoredKeys: ['id'] })).toStrictEqual({});
  });

  it('should work with ImageElement', () => {
    const src =
      'wix:image://v1/6287ae_0f00a65a3ee747cd84db23da1c9a3f8c~mv2.jpg/_.jpg#originWidth=5472&originHeight=3078';
    const alt = 'Alt Text';
    const element: ImageElement = { src, alt };
    const result = builder.addImage({ data: element }).get();
    const expected: RichContent = {
      nodes: [
        {
          id: '27u2t',
          imageData: {
            altText: alt,
            image: {
              width: 5472,
              height: 3078,
              src: {
                id: src,
              },
            },
          },
          nodes: [],
          type: Node_Type.IMAGE,
        },
      ],
    };
    expect(compare(result, expected, { ignoredKeys: ['id'] })).toStrictEqual({});
  });

  it('should work with regular input', () => {
    const result = builder
      .addImage({
        data: { image: { src: { url: 'some_url' } } },
      })
      .get();
    const expected: RichContent = {
      nodes: [
        {
          id: '123',
          imageData: { image: { src: { url: 'some_url' } } },
          nodes: [],
          type: Node_Type.IMAGE,
        },
      ],
    };
    expect(compare(result, expected, { ignoredKeys: ['id'] })).toStrictEqual({});
  });
});
