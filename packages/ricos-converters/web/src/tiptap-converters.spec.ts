import type { RichContent } from 'ricos-schema';
import {
  Decoration_Type,
  DividerData_Alignment,
  DividerData_LineStyle,
  DividerData_Width,
  Node_Type,
  PluginContainerData_Alignment,
  PluginContainerData_Width_Type,
  TextStyle_TextAlignment,
} from 'ricos-schema';
import { fromTiptap as legacyFrom, toTiptap as legacyTo } from 'wix-tiptap-extensions';
import { imageConverter, textConverter } from './node-converters';
import { fromTiptap, toTiptap } from './tiptap-converters';
import { TiptapNodeBidiTransfoms } from './tiptap-node-transforms';

describe('toTiptap', () => {
  it('should convert unsupported content', () => {
    const content: RichContent = {
      nodes: [
        {
          type: Node_Type.PARAGRAPH,
          id: 'leohf3',
          nodes: [
            {
              type: Node_Type.TEXT,
              id: '',
              nodes: [],
              textData: {
                text: 'test',
                decorations: [
                  {
                    type: Decoration_Type.BOLD,
                    fontWeightValue: 700,
                  },
                ],
              },
            },
          ],
          paragraphData: {
            textStyle: {
              textAlignment: TextStyle_TextAlignment.AUTO,
            },
            indentation: 0,
          },
        },
        {
          type: Node_Type.PARAGRAPH,
          id: '6du4s354',
          nodes: [],
          paragraphData: {
            textStyle: {
              textAlignment: TextStyle_TextAlignment.AUTO,
            },
            indentation: 0,
          },
        },
        {
          type: Node_Type.DIVIDER,
          id: 'n2d72352',
          nodes: [],
          dividerData: {
            lineStyle: DividerData_LineStyle.SINGLE,
            width: DividerData_Width.LARGE,
            alignment: DividerData_Alignment.CENTER,
            containerData: {
              alignment: PluginContainerData_Alignment.CENTER,
              width: {
                size: PluginContainerData_Width_Type.CONTENT,
              },
              textWrap: true,
            },
          },
        },
        {
          type: Node_Type.PARAGRAPH,
          id: 'd6064355',
          nodes: [],
          paragraphData: {
            textStyle: {
              textAlignment: TextStyle_TextAlignment.AUTO,
            },
            indentation: 0,
          },
        },
      ],
      metadata: {
        version: 1,
        createdTimestamp: new Date('2022-05-28T20:09:10.749Z'),
        updatedTimestamp: new Date('2022-05-28T20:09:10.749Z'),
        id: '1dda5bc8-0920-4ccd-b4b3-331bcda058f9',
      },
    };
    const legacyConversion = legacyTo(content);
    const expected = {
      ...legacyConversion,
      attrs: { ...legacyConversion.attrs, documentStyle: content.documentStyle },
    };
    const transforms = new TiptapNodeBidiTransfoms([textConverter, imageConverter]);
    const actual = toTiptap(content, transforms.toTiptap());
    expect(actual).toStrictEqual(expected);
  });
});
describe('fromTiptap', () => {
  it('should convert content with image', () => {
    const content = {
      type: 'doc',
      attrs: {
        metadata: {
          version: 1,
          createdTimestamp: '2022-05-28T14:09:10.655Z',
          updatedTimestamp: '2022-05-28T14:09:10.655Z',
          id: '1dda5bc8-0920-4ccd-b4b3-331bcda058f9',
        },
        documentStyle: {},
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
    };

    const expected = { ...legacyFrom(content), documentStyle: {} };
    const transforms = new TiptapNodeBidiTransfoms([imageConverter]);
    const actual = fromTiptap(content, transforms.fromTiptap());
    expect(actual).toStrictEqual(expected);
  });
});
