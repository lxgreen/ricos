import type { ReactElement } from 'react';
import type { DocumentStyle, Decoration } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';

type StyleType = keyof Required<DocumentStyle>;

export interface Styles {
  isActive(type: StyleType, decoration: Decoration): boolean;
  getThemeStyles(): ThemeStyles;
  getDocumentStyles(): DocumentStyles;
}

export interface ThemeStyles {
  isActive(type: StyleType, decoration: Decoration): boolean;
  setTheme(theme: RicosTheme): ThemeStyles;
  toStyleTag(): ReactElement;
}

export interface DocumentStyles {
  isActive(type: StyleType, decoration: Decoration): boolean;
  setDocumentStyles(documentStyle: DocumentStyle): DocumentStyles;
  setStyle(type: StyleType, decorations: Decoration[]): DocumentStyles;
  toStyleTag(): ReactElement;
  toContent(): DocumentStyle;
}
