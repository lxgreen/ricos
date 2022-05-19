import type { DocumentStyle as IDocumentStyle } from './models/styles';
import type { DocumentStyle as RichContentDocumentStyle } from 'ricos-schema';
import { toTheme } from './converters';
import TextualTheme from './textual-theme';

export default class DocumentStyle implements IDocumentStyle {
  documentStyle: RichContentDocumentStyle;

  constructor(documentStyle: RichContentDocumentStyle) {
    this.documentStyle = documentStyle;
  }

  getDecoration: IDocumentStyle['getDecoration'] = (nodeType, decorationType) =>
    this.documentStyle[nodeType]?.decorations.filter(
      decoration => decoration.type === decorationType
    )[0];

  toStyleTag: IDocumentStyle['toStyleTag'] = () =>
    new TextualTheme(toTheme(this.documentStyle)).toStyleTag();

  toContent: IDocumentStyle['toContent'] = () => this.documentStyle;

  setStyle: IDocumentStyle['setStyle'] = (nodeType, decorations) =>
    new DocumentStyle({ ...this.documentStyle, [nodeType]: { decorations } });

  setDocumentStyle: IDocumentStyle['setDocumentStyle'] = documentStyle =>
    new DocumentStyle(documentStyle);
}
