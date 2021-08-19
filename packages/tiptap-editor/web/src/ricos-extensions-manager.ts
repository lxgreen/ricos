import { compact } from 'lodash';
import { RicosTiptapExtension } from 'wix-rich-content-common';
import { createRicosMarkConfig } from './extensions-creators/mark';
import { createRicosFunctionalExtensionConfig } from './extensions-creators/extension';
import { createRicosNodeConfig } from './extensions-creators/node';
import { Node, Extension, Mark, AnyExtension } from '@tiptap/react';

export class ExtensionManager {
  nodeHOCs;

  extensions;

  constructor(extensions: RicosTiptapExtension[]) {
    this.extensions = ExtensionManager.toFullRicosExtensions(extensions);
    this.nodeHOCs = ExtensionManager.extractNodeHOCs(this.extensions);
  }

  static createNode(extension) {
    return Node.create(extension);
  }

  static createMark(extension) {
    return Mark.create(extension);
  }

  static createFunctionalExtension(extension) {
    return Extension.create(extension);
  }

  private static toFullRicosExtensions(extensions) {
    return compact(
      extensions.map(extension => {
        if (extension.type === 'node') {
          return createRicosNodeConfig(extension);
        }

        if (extension.type === 'mark') {
          return createRicosMarkConfig(extension);
        }

        if (extension.type === 'extension') {
          return createRicosFunctionalExtensionConfig(extension);
        }
        return null;
      })
    );
  }

  static extractNodeHOCs(extensions) {
    return extensions
      .filter(ricosExtensionConfig => ricosExtensionConfig.type === 'extension')
      .filter(ricosExtensionConfig => !!ricosExtensionConfig)
      .filter(ricosExtensionConfig => ricosExtensionConfig.addNodeViewHOC)
      .map(ricosExtensionConfig => {
        const { nodeViewHOC, nodeTypes } = ricosExtensionConfig.addNodeViewHOC();
        return {
          nodeTypes,
          nodeViewHOC,
        };
      })
      .flat()
      .filter(({ nodeViewHOC }) => !!nodeViewHOC);
  }

  getTiptapExtensions(): AnyExtension[] {
    return compact(
      this.extensions.map(extension => {
        if (extension.type === 'node') {
          return ExtensionManager.createNode(extension);
        }

        if (extension.type === 'mark') {
          return ExtensionManager.createMark(extension);
        }

        if (extension.type === 'extension') {
          return ExtensionManager.createFunctionalExtension(extension);
        }
        return null;
      })
    );
  }
}

// export class RicosExtensionManager {
//   private ricosExtensionsConfigs;

//   constructor(ricosExtensionsConfigs) {
//     this.ricosExtensionsConfigs = ricosExtensionsConfigs;
//   }

//   static extensionsConfigsToTiptapExtensions(ricosExtensionsConfigs): AnyExtension[] {
//     return ricosExtensionsConfigs.map(ricosExtensionConfig => {
//       const tiptapConfig = omit(ricosExtensionConfig, 'addNodeViewHOC', 'extensionType');
//       if (ricosExtensionConfig.extensionType === 'node') {
//         return Node.create(tiptapConfig);
//       } else if (ricosExtensionConfig.extensionType === 'mark') {
//         return Mark.create(tiptapConfig);
//       } else if (ricosExtensionConfig.extensionType === 'extension') {
//         return Extension.create(tiptapConfig);
//       }
//       return null;
//     });
//   }

//   static extractNodeViewsHOCsFromRicosExtensions(ricosExtensionsConfigs) {
//     return ricosExtensionsConfigs
//       .sort((extA, extB) => {
//         const defaultPriority = 100;
//         const extAPriority = extA.priority || defaultPriority;
//         const extBPriority = extB.priority || defaultPriority;

//         if (extAPriority > extBPriority) {
//           return -1;
//         }

//         if (extAPriority < extBPriority) {
//           return 1;
//         }
//         return 0;
//       })
//       .filter(ricosExtensionConfig => ricosExtensionConfig.extensionType === 'extension')
//       .filter(ricosExtensionConfig => !!ricosExtensionConfig.addNodeViewHOC)
//       .map(ricosExtensionConfig => {
//         const { nodeViewHOC, nodeTypes } = ricosExtensionConfig.addNodeViewHOC();
//         return {
//           types: nodeTypes,
//           nodeViewHOC,
//         };
//       })
//       .flat()
//       .filter(({ nodeViewHOC }) => !!nodeViewHOC)
//       .reduce((acc, { types, nodeViewHOC }) => {
//         types.forEach(type => {
//           if (!acc[type]) {
//             acc[type] = [];
//           }
//           acc[type].push(nodeViewHOC);
//         });
//         return acc;
//       }, {});
//   }
// }
