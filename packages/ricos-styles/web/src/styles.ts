import type { ReactElement } from 'react';
import type { Decoration_Type, DocumentStyle as RichContentDocumentStyle } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';
import DocumentStyle from './document-style/document-style';
import type { Styles, TextNodeType } from './models/styles';
import TextualTheme from './textual-theme/textual-theme';

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

  getTextStyle(nodeType: TextNodeType) {
    const documentStyleTextStyle = this.documentStyle.getTextStyle(nodeType);
    const themeTextStyle = this.theme.getTextStyle(nodeType);
    return themeTextStyle.overrideWith(documentStyleTextStyle.getTextStyle()).getTextStyle();
  }

  getNodeStyle(nodeType: TextNodeType) {
    const documentStyleNodeStyle = this.documentStyle.getNodeStyle(nodeType);
    const themeTextStyle = this.theme.getNodeStyle(nodeType);
    return themeTextStyle.overrideWith(documentStyleNodeStyle.getNodeStyle()).getNodeStyle();
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
