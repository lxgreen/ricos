import plainTextContent from './plainTextContent.json';
import { fromPlainText } from './fromPlainText';
import { PLAIN_TEXT } from '../toPlainText/complexPlainText';
import { compare } from '../../../comparision/compare';

describe('convert from plain text', () => {
  it('should convert complex content', () => {
    const content = fromPlainText(PLAIN_TEXT);
    expect(
      compare(content, plainTextContent, {
        ignoredKeys: ['key', 'createdVersion', 'updatedVersion', 'indentation'],
      })
    ).toEqual({});
  });
});
