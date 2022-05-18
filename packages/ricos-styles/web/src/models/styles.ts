import type { ReactElement } from 'react';
import type {
  DocumentStyle as RichContentDocumentStyle,
  Decoration,
  Decoration_Type,
} from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';

type StyledNodeType = keyof Required<DocumentStyle>;

export interface TextualTheme {
  getDecoration(type: StyledNodeType, decoration: Decoration_Type): Decoration;
  toStyleTag(): ReactElement;
  setTheme(theme: RicosTheme): TextualTheme;
}

export interface DocumentStyle {
  getDecoration(type: StyledNodeType, decoration: Decoration_Type): Decoration;
  toStyleTag(): ReactElement;
  toContent(): RichContentDocumentStyle;
  setStyle(type: StyledNodeType, decorations: Decoration[]): DocumentStyle;
  setDocumentStyle(documentStyle: RichContentDocumentStyle): DocumentStyle;
}

export interface Styles {
  getDecoration(type: StyledNodeType, decoration: Decoration_Type): Decoration;
  getTheme(): TextualTheme;
  getDocumentStyle(): DocumentStyle;
}
