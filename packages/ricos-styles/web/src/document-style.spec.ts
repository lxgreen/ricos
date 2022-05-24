import DocumentStyle from './document-style';
import { decorations } from './consts';

describe('Document Style', () => {
  const documentStyle = {
    headerOne: {
      decorations,
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
  });
});
