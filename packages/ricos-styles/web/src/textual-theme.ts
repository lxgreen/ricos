import type { TextualTheme as ITextualTheme } from './models/styles';
import { themeStrategy } from 'ricos-common';
import { toCustomStyleType, toDecoration } from './converters';
import type { RicosTheme, CustomTextualStyle } from 'ricos-types';

export default class TextualTheme implements ITextualTheme {
  theme: RicosTheme;

  constructor(theme: RicosTheme) {
    this.theme = theme;
  }

  getDecoration: ITextualTheme['getDecoration'] = (nodeType, decorationType) => {
    const textType = toCustomStyleType(nodeType);
    const textStyle = this.theme.customStyles?.[textType] as CustomTextualStyle;
    return textStyle && toDecoration(textStyle, decorationType);
  };

  toStyleTag: ITextualTheme['toStyleTag'] = () => themeStrategy({ ricosTheme: this.theme }).html;

  setTheme: ITextualTheme['setTheme'] = theme => new TextualTheme(theme);
}
