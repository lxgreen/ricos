import type { ReactElement } from 'react';
import type {
  DocumentStyle as RichContentDocumentStyle,
  Decoration,
  Decoration_Type,
} from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';

type TextNodeType = keyof Required<RichContentDocumentStyle>;

export interface TextualTheme {
  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type): Decoration | undefined;
  toStyleTag(): ReactElement;
  setTheme(theme: RicosTheme): TextualTheme;
}

export interface DocumentStyle {
  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type): Decoration | undefined;
  toStyleTag(): ReactElement;
  toContent(): RichContentDocumentStyle;
  setStyle(nodeType: TextNodeType, decorations: Decoration[]): DocumentStyle;
  setDocumentStyle(documentStyle: RichContentDocumentStyle): DocumentStyle;
}

export interface Styles {
  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type): Decoration | undefined;
  getTheme(): TextualTheme;
  getDocumentStyle(): DocumentStyle;
}
