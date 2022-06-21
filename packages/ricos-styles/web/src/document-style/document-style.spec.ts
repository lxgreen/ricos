import DocumentStyle from './document-style';
import { decorations, nodeStyle, textStyle, headingNode } from '../tests/test-cases';
import type { HeadingNode } from 'ricos-content';

describe('Document Style', () => {
  const documentStyle = {
    headerOne: {
      decorations,
      nodeStyle,
      ...textStyle,
    },
    paragraph: {
      decorations,
    },
  };

  it('Should toStyleTag match expected', () => {
    const styleTag = new DocumentStyle(documentStyle).toStyleTag();
    expect(styleTag.type).toStrictEqual('style');
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-h1-color: #414141')
    ).toBeTruthy();
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-h1-font-weight: 700')
    ).toBeTruthy();
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-p-color: #414141')
    ).toBeTruthy();
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-h1-line-height: 3')
    ).toBeTruthy();
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-h1-padding-bottom: 3px')
    ).toBeTruthy();
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-h1-padding-top: 2px')
    ).toBeTruthy();
    expect(
      JSON.stringify(styleTag.props.children).includes('--ricos-custom-p-background-color: #808080')
    ).toBeTruthy();
  });

  it('Should fromNode match expected', () => {
    const documentStyleContent = DocumentStyle.fromNode(headingNode as HeadingNode).toContent();
    const expected = {
      headerThree: {
        decorations: [
          {
            type: 'COLOR',
            colorData: {
              foreground: '#818181',
            },
          },
          {
            type: 'BOLD',
            fontWeightValue: 700,
          },
        ],
        nodeStyle: {
          paddingTop: '5px',
          paddingBottom: '2px',
        },
        lineHeight: '3',
      },
    };
    expect(documentStyleContent).toStrictEqual(expected);
  });

  it('Should setStyle match expected', () => {
    const documentStyleContent = new DocumentStyle(documentStyle)
      .setStyle('headerOne', {
        decorations,
        lineHeight: '5',
      })
      .toContent();
    const expected = {
      headerOne: {
        decorations,
        lineHeight: '5',
      },
      paragraph: {
        decorations,
      },
    };
    expect(documentStyleContent).toStrictEqual(expected);
  });

  it('Should overrideWith match expected', () => {
    const documentStyleContent = new DocumentStyle(documentStyle)
      .overrideWith({
        headerOne: {
          decorations,
          lineHeight: '5',
        },
      })
      .toContent();

    const expected = {
      headerOne: {
        decorations,
        lineHeight: '5',
      },
      paragraph: {
        decorations,
      },
    };
    expect(documentStyleContent).toStrictEqual(expected);
  });
});
