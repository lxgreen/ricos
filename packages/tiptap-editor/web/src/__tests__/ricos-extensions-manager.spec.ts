import { omit } from 'lodash';
import { RicosNodeConfig, RicosMarkConfig, RicosGenericExtensionConfig } from '../types';
import { Node, Mark, Extension } from '@tiptap/core';
import { createRicosExtensionsConfigs } from '../extensions-creators/config-creators/configCreator';
import { mockPlugins } from './configCreator/mockPlugins';
import { RicosExtensionManager } from '../ricos-extensions-manager';

const [a, b, c] = mockPlugins;
const extensionConfigs = createRicosExtensionsConfigs([a, b, c]);

describe('Ricos Extension Manager', () => {
  it('should create extensions', () => {
    const extensions = RicosExtensionManager.extensionsConfigsToTiptapExtensions(extensionConfigs);
    const [node, mark, extension] = extensionConfigs.map(config =>
      omit(config, 'addNodeViewHOC', 'extensionType')
    );

    expect(extensions).toStrictEqual([
      Node.create(node as RicosNodeConfig),
      Mark.create(mark as RicosMarkConfig),
      Extension.create(extension as RicosGenericExtensionConfig),
    ]);
  });

  it('should create nodeViewHOCs', () => {
    const nodeViewHOCs = RicosExtensionManager.extractNodeViewsHOCsFromRicosExtensions(
      createRicosExtensionsConfigs([a, b, c])
    );

    expect(nodeViewHOCs).toBeTruthy();
    expect(nodeViewHOCs).toHaveProperty('test1');
    expect(nodeViewHOCs.test1).toBeTruthy();
    expect(nodeViewHOCs.test1[0]).toBeTruthy();
    //TODO: Should test functionality better
  });
});
