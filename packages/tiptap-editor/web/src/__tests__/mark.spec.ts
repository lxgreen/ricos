import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { MarkConfig, mergeAttributes } from '@tiptap/core';
import { createRicosMarkConfig } from '../extensions-creators/mark';
const createConfig: CreateExtensionParams<MarkConfig>['createConfig'] = tiptapUtils => ({
  name: 'test',
  dummyField: true,
  tiptapUtils,
});
const createComponentDataDefaults: CreateExtensionParams<
  MarkConfig
>['createComponentDataDefaults'] = ({ ImageData }) => ImageData.fromJSON({});

describe('Mark', () => {
  const dummyContext = {
    parent: null,
    options: {},
  };
  const markConfig = createRicosMarkConfig({ createConfig, createComponentDataDefaults });
  it('should have name field (required)', () => {
    expect(markConfig.name).toStrictEqual('test');
  });
  it('should add custom fields', () => {
    expect(markConfig.dummyField).toBe(true);
  });
  it('should add "extensionType = mark"', () => {
    expect(markConfig.extensionType).toStrictEqual('mark');
  });
  it('should pass tiptap core utils ("mergeAttributes") to config creator', () => {
    expect(markConfig.tiptapUtils).toBeTruthy();
    expect(markConfig.tiptapUtils.mergeAttributes).toStrictEqual(mergeAttributes);
  });
  it('should run with "createComponentDataDefaults" undefined', () => {
    const newMarkConfig = createRicosMarkConfig({ createConfig });
    expect(newMarkConfig.addAttributes?.apply(dummyContext)).toStrictEqual({});
  });
  it('should pass "ricos-schema" param into "createComponentDataDefaults"', () => {
    expect(markConfig.addAttributes?.apply(dummyContext)).toStrictEqual({
      altText: undefined,
      caption: undefined,
      containerData: undefined,
      disableDownload: undefined,
      disableExpand: undefined,
      image: undefined,
      link: undefined,
    });
  });
});
