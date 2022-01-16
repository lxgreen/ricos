import { RichContent, Node_Type } from 'ricos-schema';
import { modify } from './modify';
import rawContent from '../../tests/modifyFixtures/images-dividers.json';
import { extract } from '../RicosContentAPI/extract';

describe('modify', () => {
  it('should trigger callback', () => {
    const content = RichContent.fromJSON(rawContent);
    const callback = jest.fn();
    const _ = modify(content, callback)
      .eq('type', Node_Type.DIVIDER)
      .set(n => [n, n]);

    expect(callback).toBeCalledTimes(1);
  });
  it('velo modifier should work (basic test)', () => {
    const content = RichContent.fromJSON(rawContent);
    const callback = jest.fn();

    // multiply dividers
    const result = modify(content, callback)
      .eq('type', Node_Type.DIVIDER)
      .set(n => [n, n]);

    const extractDividers = (content: RichContent) =>
      extract(content.nodes)
        .filter(node => node.type === Node_Type.DIVIDER)
        .get();

    // check total amount of dividers has been doubled
    const originalDividersCount = extractDividers(content).length;
    const newDividersCount = extractDividers(result).length;
    expect(originalDividersCount * 2).toBe(newDividersCount);
  });
});
