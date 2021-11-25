import { RichContent, Node_Type } from 'ricos-schema';
import { modify } from './modify';
import rawContent from '../../tests/modifyFixtures/images-dividers.json';

it('should trigger callback', () => {
  const content = RichContent.fromJSON(rawContent);
  const callback = jest.fn();
  const _ = modify(content, callback)
    .filter(({ type }) => type === Node_Type.DIVIDER)
    .set(n => [n, n]);

  expect(callback).toBeCalledTimes(1);
});
