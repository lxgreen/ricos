import { pick } from 'lodash';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { NodeConfig, mergeAttributes } from '@tiptap/core';
import { createRicosNodeConfig } from './node';
import { HTMLAttributes } from 'react';
const createConfig: CreateExtensionParams<NodeConfig>['createConfig'] = tiptapUtils => ({
  name: 'test',
  dummyField: true,
  tiptapUtils,
});
const createComponentDataDefaults: CreateExtensionParams<
  NodeConfig
>['createComponentDataDefaults'] = ({ ImageData }) => ImageData.fromJSON({});

describe('Node', () => {
  const dummyContext = {
    parent: null,
    options: {},
  };
  const htmlAttrs: HTMLAttributes<HTMLDivElement> = {
    color: '#00ffff',
  };
  const expectedDefaults: Omit<NodeConfig, 'name'> = {
    atom: true,
    group: 'block',
    draggable: true,
    selectable: true,
  };
  const nodeConfig = createRicosNodeConfig({ createConfig, createComponentDataDefaults });
  it('should have name field (required)', () => {
    expect(nodeConfig.name).toStrictEqual('test');
  });
  it('should add custom fields', () => {
    expect(nodeConfig.dummyField).toBe(true);
  });
  it('should add "extensionType = node"', () => {
    expect(nodeConfig.extensionType).toStrictEqual('node');
  });
  it('should add node defaults', () => {
    const defaultsToCheck = pick(nodeConfig, 'atom', 'draggable', 'group', 'selectable');
    expect(defaultsToCheck).toStrictEqual(expectedDefaults);
  });
  it('should run renderHTML correctly', () => {
    expect(
      nodeConfig.renderHTML?.apply?.(dummyContext, [{ HTMLAttributes: htmlAttrs }])
    ).toStrictEqual(['test-component', { color: '#00ffff' }]);
  });
  it('should run parseHTML correctly', () => {
    expect(nodeConfig.parseHTML?.apply?.(dummyContext)).toStrictEqual([{ tag: 'test-component' }]);
  });
  it('should pass tiptap core utils ("mergeAttributes") to config creator', () => {
    expect(nodeConfig.tiptapUtils).toBeTruthy();
    expect(nodeConfig.tiptapUtils.mergeAttributes).toStrictEqual(mergeAttributes);
  });
  it('should run with "createComponentDataDefaults" undefined', () => {
    const newNodeConfig = createRicosNodeConfig({ createConfig });
    expect(newNodeConfig.addAttributes?.apply?.(dummyContext)).toStrictEqual({});
  });
  it('should pass "ricos-schema" param into "createComponentDataDefaults"', () => {
    expect(nodeConfig.addAttributes?.apply?.(dummyContext)).toStrictEqual({
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
