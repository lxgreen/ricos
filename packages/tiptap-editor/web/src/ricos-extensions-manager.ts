import { omit } from 'lodash';
import { Node, AnyExtension, Mark, Extension } from '@tiptap/core';

export class RicosExtensionManager {
  static extensionsConfigsToTiptapExtensions(ricosExtensionsConfigs): AnyExtension[] {
    return ricosExtensionsConfigs.map(ricosExtensionConfig => {
      const tiptapConfig = omit(ricosExtensionConfig, 'addNodeViewHOC', 'extensionType');
      if (ricosExtensionConfig.extensionType === 'node') {
        return Node.create(tiptapConfig);
      } else if (ricosExtensionConfig.extensionType === 'mark') {
        return Mark.create(tiptapConfig);
      } else if (ricosExtensionConfig.extensionType === 'extension') {
        return Extension.create(tiptapConfig);
      }
      return null;
    });
  }

  static extractNodeViewsHOCsFromRicosExtensions(ricosExtensionsConfigs) {
    return ricosExtensionsConfigs
      .sort((extA, extB) => {
        const defaultPriority = 100;
        const extAPriority = extA.priority || defaultPriority;
        const extBPriority = extB.priority || defaultPriority;

        if (extAPriority > extBPriority) {
          return -1;
        }

        if (extAPriority < extBPriority) {
          return 1;
        }
        return 0;
      })
      .filter(ricosExtensionConfig => ricosExtensionConfig.extensionType === 'extension')
      .filter(ricosExtensionConfig => !!ricosExtensionConfig.addNodeViewHOC)
      .map(ricosExtensionConfig => {
        const { nodeViewHOC, nodeTypes } = ricosExtensionConfig.addNodeViewHOC();
        return {
          types: nodeTypes,
          nodeViewHOC,
        };
      })
      .flat()
      .filter(({ nodeViewHOC }) => !!nodeViewHOC)
      .reduce((acc, { types, nodeViewHOC }) => {
        types.forEach(type => {
          if (!acc[type]) {
            acc[type] = [];
          }
          acc[type].push(nodeViewHOC);
        });
        return acc;
      }, {});
  }
}
