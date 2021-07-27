import { toAst, hasStyle } from './parse5-utils';
import { Element } from 'parse5';

describe('parse5 utils', () => {
  it('should determine whether element has certain style', () => {
    const ast = toAst('<span style="font-weight: bold; font-style: italic">test</test>');
    const hasItalic = hasStyle({ 'font-style': 'italic' })(ast.childNodes[0] as Element);
    expect(hasItalic).toBeTruthy();
  });
});
