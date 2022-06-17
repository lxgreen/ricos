import type { RichContent } from 'ricos-schema';
import { createEmptyContent } from './createEmptyContent';

describe('createEmptyContent', () => {
  it('should create valid empty content', () => {
    const date = new Date();
    const newContent = createEmptyContent({
      version: 1,
      id: '1234',
      createdTimestamp: date,
      updatedTimestamp: date,
    });
    expect(newContent).toStrictEqual<RichContent>({
      nodes: [],
      metadata: {
        version: 1,
        id: '1234',
        createdTimestamp: date,
        updatedTimestamp: date,
      },
    });
  });
});
