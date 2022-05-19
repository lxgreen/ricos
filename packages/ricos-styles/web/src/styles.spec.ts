import type { RicosTheme } from 'ricos-types';
import { Decoration_Type } from 'ricos-types';
import { decorations, customStyle } from './consts';
import Styles from './styles';

describe('Styles', () => {
  it('Should getDecoration match document style decoration ', () => {
    const documentStyle = {
      headerOne: {
        decorations,
      },
    };
    const theme: RicosTheme = {
      customStyles: {
        h1: { ...customStyle, color: '#888888' },
      },
    };
    const decoration = new Styles(theme, documentStyle).getDecoration(
      'headerOne',
      Decoration_Type.COLOR
    );
    expect(decoration).toEqual({
      colorData: {
        foreground: '#414141',
      },
      type: 'COLOR',
    });
  });

  it('Should getDecoration match theme decoration', () => {
    const documentStyle = {
      headerOne: {
        decorations,
      },
    };
    const theme: RicosTheme = {
      customStyles: {
        p: { ...customStyle, color: '#888888' },
      },
    };
    const decoration = new Styles(theme, documentStyle).getDecoration(
      'paragraph',
      Decoration_Type.COLOR
    );
    expect(decoration).toEqual({
      colorData: {
        foreground: '#888888',
      },
      type: 'COLOR',
    });
  });
});
