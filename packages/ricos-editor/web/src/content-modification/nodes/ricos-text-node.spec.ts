import { Node_Type } from 'ricos-schema';
import { RicosTextNode } from './ricos-text-node';
import type { TextNode } from 'ricos-content';

describe('Ricos Text Node', () => {
  const textNode1: TextNode = {
    type: Node_Type.TEXT,
    id: '',
    nodes: [],
    textData: {
      text: 'Hello',
      decorations: [],
    },
  };

  it('Should getSelected return false', () => {
    const ricosTextNode1 = RicosTextNode.of(textNode1);
    const actual = ricosTextNode1.getSelection();
    expect(actual).toStrictEqual(false);
  });

  it('Should getData match the expected', () => {
    const ricosTextNode1 = RicosTextNode.of(textNode1);
    const actual = ricosTextNode1.getData();
    expect(actual).toStrictEqual({ text: 'Hello', decorations: [] });
  });
});
