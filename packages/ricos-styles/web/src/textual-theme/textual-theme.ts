// TODO: move themeStrategy from ricos-common to this package
import { themeStrategy } from 'ricos-common';
import type { Decoration_Type, DocumentStyle } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';
import { Decorations } from '../decorations';
import type { TextDecoration } from '../models/decoration';
import type { TextNodeType, TextualTheme } from '../models/styles';
import { TextStyleTransformer } from '../text-style-transformer';
import TextStyle from '../document-style/text-style';
import NodeStyle from '../document-style/node-style';

export default class RicosTextualTheme implements TextualTheme {
  theme: RicosTheme;

  documentStyle: DocumentStyle;

  constructor(theme: RicosTheme) {
    this.theme = theme;
    this.documentStyle = TextStyleTransformer.fromTheme(this.theme).toDocumentStyle();
  }

  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type): TextDecoration {
    const textNodeStyle = this.documentStyle[nodeType];
    return Decorations.of(textNodeStyle?.decorations || []).byType(decorationType);
  }

  getTextStyle(nodeType: TextNodeType) {
    return new TextStyle({ lineHeight: this.documentStyle[nodeType]?.lineHeight });
  }

  getNodeStyle(nodeType: TextNodeType) {
    return new NodeStyle(this.documentStyle[nodeType]?.nodeStyle || {});
  }

  toStyleTag() {
    return themeStrategy({ ricosTheme: this.theme }).html;
  }
}
