import { omit } from 'lodash';
import { Node, AnyExtension, Mark, Extension } from '@tiptap/core';

export class RicosExtensionManager {
  static ricosExtensionsTotiptapExtensions(ricosExtensions): AnyExtension[] {
    return ricosExtensions.map(ricosExtension => {
      const tiptapConfig = omit(ricosExtension, 'addNodeViewHOC', 'extensionType');
      if (ricosExtension.extensionType === 'node') {
        return Node.create(tiptapConfig);
      } else if (ricosExtension.extensionType === 'mark') {
        return Mark.create(tiptapConfig);
      } else if (ricosExtension.extensionType === 'extension') {
        return Extension.create(tiptapConfig);
      }
      return null;
    });
  }

  static extractNodeViewsHOCsFromRicosExtensions(ricosExtensions) {
    return ricosExtensions
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
      .filter(ricosExtension => ricosExtension.extensionType === 'extension')
      .filter(ricosExtension => !!ricosExtension.addNodeViewHOC)
      .map(ricosExtension => {
        const { nodeViewHOC, nodeTypes } = ricosExtension.addNodeViewHOC();
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
