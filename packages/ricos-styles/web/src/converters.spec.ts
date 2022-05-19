import { toTheme } from './converters';
import { customStyle, decorations } from './consts';
import type { DocumentStyle } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';

describe('Converters', () => {
  const theme: RicosTheme = {
    customStyles: {
      h1: customStyle,
      p: customStyle,
    },
  };

  const documentStyle: DocumentStyle = {
    headerOne: {
      decorations,
    },
    paragraph: {
      decorations,
    },
  };

  it('Should toTheme match expected', () => {
    expect(toTheme(documentStyle)).toEqual(theme);
  });
});
