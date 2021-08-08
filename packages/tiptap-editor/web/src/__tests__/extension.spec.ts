import { mergeAttributes } from '@tiptap/core';
const createConfig = tiptapUtils => ({
  name: 'test',
  dummyField: true,
  tiptapUtils,
});
const createComponentDataDefaults = ({ ImageData }) => ImageData.fromJSON({});

describe('Extension', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const extensionConfig: Record<string, any> = {
    createConfig,
    createComponentDataDefaults,
  };
  it('should have name field (required)', () => {
    expect(extensionConfig.name).toStrictEqual('test');
  });
  it('should add custom fields', () => {
    expect(extensionConfig.dummyField).toBe(true);
  });
  it('should add "extensionType = extension"', () => {
    expect(extensionConfig.extensionType).toStrictEqual('extension');
  });
  it('should pass tiptap core utils ("mergeAttributes") to config creator', () => {
    expect(extensionConfig.tiptapUtils).toBeTruthy();
    expect(extensionConfig.tiptapUtils.mergeAttributes).toStrictEqual(mergeAttributes);
  });
});
