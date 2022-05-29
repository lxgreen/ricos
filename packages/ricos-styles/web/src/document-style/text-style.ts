import type { TextStyle as TextStyleRichContent } from 'ricos-schema';
import type { CustomTextualStyle } from 'ricos-types';
import type { TextStyle } from '../models/text-style';

export default class RicosTextStyle implements TextStyle {
  textStyle: Omit<TextStyleRichContent, 'textAlignment'>;

  constructor(textStyle: Omit<TextStyleRichContent, 'textAlignment'>) {
    this.textStyle = textStyle;
  }

  getTextStyle: TextStyle['getTextStyle'] = () => this.textStyle;

  static fromCustomStyle = (customStyle: CustomTextualStyle): TextStyle => {
    const { lineHeight } = customStyle;
    const textStyle = { lineHeight } as TextStyleRichContent;
    return new RicosTextStyle(textStyle);
  };

  toCustomStyle: TextStyle['toCustomStyle'] = () => {
    return { lineHeight: this.textStyle.lineHeight };
  };

  overrideWith: TextStyle['overrideWith'] = textStyle => {
    return new RicosTextStyle({ ...this.textStyle, ...textStyle });
  };
}
