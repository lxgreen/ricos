import type { ReactElement } from 'react';
import type { Decoration_Type, DocumentStyle as RichContentDocumentStyle } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';
import DocumentStyle from './document-style';
import type { Styles, TextNodeType } from './models/styles';
import TextualTheme from './textual-theme';

export default class RicosStyles implements Styles {
  private theme!: TextualTheme;

  private documentStyle!: DocumentStyle;

  toStyleTags(): ReactElement[] {
    return [this.theme.toStyleTag(), this.documentStyle.toStyleTag()];
  }

  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type) {
    const documentStyleDecoration = this.documentStyle.getDecoration(nodeType, decorationType);
    const themeDecoration = this.theme.getDecoration(nodeType, decorationType);
    return themeDecoration.overrideWith(documentStyleDecoration).getDecoration();
  }

  getTheme() {
    return this.theme;
  }

  setTheme(theme: RicosTheme) {
    this.theme = new TextualTheme(theme);
    return this;
  }

  getDocumentStyle() {
    return this.documentStyle;
  }

  setDocumentStyle(documentStyle: RichContentDocumentStyle) {
    this.documentStyle = new DocumentStyle(documentStyle);
    return this;
  }
}
