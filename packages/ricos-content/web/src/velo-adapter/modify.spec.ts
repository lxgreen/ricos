import { RichContent, Node_Type } from 'ricos-schema';
import { modify } from './modify';
import rawContent from '../../tests/modifyFixtures/images-dividers.json';
import rawContentDoubleDividers from '../../tests/modifyFixtures/images-dividers2x.json';

it('should trigger callback', () => {
  const content = RichContent.fromJSON(rawContent);
  const expected = RichContent.fromJSON(rawContentDoubleDividers);

  let tempContent: RichContent = { nodes: [] };
  const mockFunc = (content: RichContent) => (tempContent = content);
  const callback = jest.fn(mockFunc);

  const actual = modify(content, callback)
    .filter(({ type }) => type === Node_Type.DIVIDER)
    .set(n => [n, n]);

  expect(callback).toBeCalledTimes(1);
  expect(actual).toEqual(expected);
  expect(actual).toEqual(tempContent);
});
