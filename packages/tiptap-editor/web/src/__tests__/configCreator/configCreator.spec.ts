import { mockPlugins } from './mockPlugins';
import { createRicosExtensionsConfigs } from '../../extensions-creators/config-creators/configCreator';

describe('Config Creator', () => {
  const [nodePlugin, markPlugin, genericPlugin, errorPlugin] = mockPlugins;
  const [mockNodeConfig, mockMarkConfig, mockGenericConfig] = createRicosExtensionsConfigs([
    nodePlugin,
    markPlugin,
    genericPlugin,
  ]);
  it('should create nodes successfully', () => {
    expect(mockNodeConfig).toBeTruthy();
    expect(mockNodeConfig.extensionType).toStrictEqual('node');
    expect(mockNodeConfig.name).toStrictEqual('test1');
    expect(mockNodeConfig.dummy).toStrictEqual(true);
    expect(mockNodeConfig.addNodeView).toBeTruthy();
  });
  it('should create marks successfully', () => {
    expect(mockMarkConfig).toBeTruthy();
    expect(mockMarkConfig.extensionType).toStrictEqual('mark');
    expect(mockMarkConfig.name).toStrictEqual('test2');
  });
  it('should create generic extensions successfully', () => {
    expect(mockGenericConfig).toBeTruthy();
    expect(mockGenericConfig.extensionType).toStrictEqual('extension');
    expect(mockGenericConfig.name).toStrictEqual('test3');
  });
  it('should throw upon unknown extension type', () => {
    expect(() => createRicosExtensionsConfigs([errorPlugin])).toThrow();
  });
});
