import { omit } from 'lodash';
import { RicosNodeConfig, RicosMarkConfig, RicosGenericExtensionConfig } from '../types';
import { Node, Mark, Extension } from '@tiptap/core';
import { createRicosExtensionsConfigs } from '../extensions-creators/config-creators/configCreator';
import { mockPlugins } from './configCreator/mockPlugins';
import { RicosExtensionManager } from '../ricos-extensions-manager';

const [a, b, c] = mockPlugins;

describe('Ricos Extension Manager', () => {
  it('should create extensions', () => {
    const extensionConfigs = createRicosExtensionsConfigs([a, b, c]);
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
});
