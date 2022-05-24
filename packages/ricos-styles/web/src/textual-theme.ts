// TODO: move themeStrategy from ricos-common to this package
import { themeStrategy } from 'ricos-common';
import type { Decoration_Type } from 'ricos-schema';
import type { RicosTheme } from 'ricos-types';
import { Decorations } from './decorations';
import type { TextNodeType, TextualTheme } from './models/styles';
import { TextStyle } from './text-style';

export default class RicosTextualTheme implements TextualTheme {
  theme: RicosTheme;

  constructor(theme: RicosTheme) {
    this.theme = theme;
  }

  getDecoration(nodeType: TextNodeType, decorationType: Decoration_Type) {
    const documentStyle = TextStyle.fromTheme(this.theme).toDocumentStyle();
    const textNodeStyle = documentStyle[nodeType];
    return Decorations.of(textNodeStyle?.decorations || [])
      .byType(decorationType)
      .getDecoration();
  }

  toStyleTag() {
    return themeStrategy({ ricosTheme: this.theme }).html;
  }

  setTheme(theme: RicosTheme) {
    return new RicosTextualTheme(theme);
  }
}
