import type {
  Decoration,
  Decoration_Type,
  DocumentStyle as RichContentDocumentStyle,
} from 'ricos-schema';
import { Decorations } from './decorations';
import type { TextDecoration } from './models/decoration';
import type { DocumentStyle, TextNodeType } from './models/styles';
import { TextStyle } from './text-style';
import RicosTextualTheme from './textual-theme';

export default class RicosDocumentStyle implements DocumentStyle {
  documentStyle: RichContentDocumentStyle;

  constructor(documentStyle: RichContentDocumentStyle) {
    this.documentStyle = documentStyle;
  }

  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type): TextDecoration {
    return Decorations.of(this.documentStyle[nodeType]?.decorations || []).byType(decorationType);
  }

  toStyleTag() {
    const customStyles = TextStyle.fromDocumentStyle(this.documentStyle).toThemeCustomStyles();
    return new RicosTextualTheme({ customStyles }).toStyleTag();
  }

  toContent() {
    return this.documentStyle;
  }

  setStyle(nodeType: TextNodeType, decorations: Decoration[]) {
    return new RicosDocumentStyle({ ...this.documentStyle, [nodeType]: { decorations } });
  }
}
