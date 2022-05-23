import type { ReactElement, JSXElementConstructor } from 'react';
import type { DocumentStyle as RichContentDocumentStyle } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';
import DocumentStyle from './document-style';
import type { Styles as IStyles } from './models/styles';
import TextualTheme from './textual-theme';

export default class Styles implements IStyles {
  theme: RicosTheme;

  documentStyle: RichContentDocumentStyle;

  constructor(theme: RicosTheme, documentStyle: RichContentDocumentStyle) {
    this.theme = theme;
    this.documentStyle = documentStyle;
  }

  toStyleTags(): ReactElement[] {
    throw new Error('Method not implemented.');
  }

  getDecoration: IStyles['getDecoration'] = (nodeType, decorationType) => {
    const documentStyleDecoration = this.getDocumentStyle().getDecoration(nodeType, decorationType);
    const themeDecoration = this.getTheme().getDecoration(nodeType, decorationType);
    return documentStyleDecoration && themeDecoration
      ? { ...themeDecoration, ...documentStyleDecoration }
      : documentStyleDecoration
      ? documentStyleDecoration
      : themeDecoration;
  };

  getTheme: IStyles['getTheme'] = () => new TextualTheme(this.theme);

  getDocumentStyle: IStyles['getDocumentStyle'] = () => new DocumentStyle(this.documentStyle);
}
