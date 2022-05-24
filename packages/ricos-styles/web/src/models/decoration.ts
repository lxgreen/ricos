import type { Decoration, Decoration_Type } from 'ricos-schema';
import type { CustomTextualStyle, RicosTheme } from 'ricos-types';

export interface TextDecoration {
  type: Decoration_Type;
  getDecoration: () => Decoration;
  fromCustomStyle: (customStyle: CustomTextualStyle) => TextDecoration;
  toCustomStyle: () => CustomTextualStyle;
}

export interface TextDecorations {
  toCustomStyle: () => CustomTextualStyle;
  byType: (type: Decoration_Type) => TextDecoration;
  toDecorationArray: () => Decoration[];
}
