import NodeStyle from './node-style';
import { nodeStyle as customStyle } from '../tests/test-cases';

describe('Node Style', () => {
  it('Should fromCustomStyle match expected', () => {
    const nodeStyle = NodeStyle.fromCustomStyle(customStyle);
    expect(nodeStyle.getNodeStyle()).toStrictEqual(customStyle);
  });

  it('Should fromCustomStyle match expected', () => {
    const nodeStyle = NodeStyle.fromCustomStyle(customStyle);
    expect(nodeStyle.toCustomStyle()).toStrictEqual(customStyle);
  });

  it('Should overrideWith match expected', () => {
    const nodeStyle = NodeStyle.fromCustomStyle(customStyle);
    expect(
      nodeStyle.overrideWith({ backgroundColor: '#909090', paddingBottom: '6px' }).getNodeStyle()
    ).toStrictEqual({ ...customStyle, backgroundColor: '#909090', paddingBottom: '6px' });
  });
});
