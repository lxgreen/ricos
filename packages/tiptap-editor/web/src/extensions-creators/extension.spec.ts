import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { MarkConfig, mergeAttributes } from '@tiptap/core';
import { createRicosGenericExtensionConfig } from './extension';
const createConfig: CreateExtensionParams<MarkConfig>['createConfig'] = tiptapUtils => ({
  name: 'test',
  dummyField: true,
  tiptapUtils,
});
const createComponentDataDefaults: CreateExtensionParams<
  MarkConfig
>['createComponentDataDefaults'] = ({ ImageData }) => ImageData.fromJSON({});

describe('Extension', () => {
  const extensionConfig = createRicosGenericExtensionConfig({
    createConfig,
    createComponentDataDefaults,
  });
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
