import { NodeViewHoc } from 'wix-rich-content-common';
import React from 'react';
import { isArray } from 'lodash';

const pipe = functions => data => {
  return functions.reduce((value, func) => func(value), data);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NodeHOCsContext = React.createContext<Record<string, any> | null>(null);
type NodeHOC = {
  nodeTypes: string[];
  nodeViewHOC: NodeViewHoc;
};
export class RicosNodeHOCManager {
  nodeHOCsMap: Record<string, NodeHOC[]>;

  static DEFAULT_PRIORITY = 100;

  constructor(nodeHOCs) {
    this.nodeHOCsMap = RicosNodeHOCManager.toTypeHOCsMap(nodeHOCs);
  }

  private static toTypeHOCsMap(nodeHOCs) {
    const nodeHOCsMap = {};
    RicosNodeHOCManager.sort(nodeHOCs).forEach(({ nodeTypes, nodeViewHOC }) => {
      if (nodeTypes.includes('*')) {
        if (!isArray(nodeHOCsMap['*'])) {
          nodeHOCsMap['*'] = [];
        }
        nodeHOCsMap['*'].push(nodeViewHOC);
      } else {
        nodeTypes.forEach(type => {
          if (!isArray(nodeHOCsMap[type])) {
            nodeHOCsMap[type] = type[type] || [];
          }
          nodeHOCsMap[type].push(nodeViewHOC);
        });
      }
    });
    return nodeHOCsMap;
  }

  static sort(nodeHOCs) {
    return nodeHOCs.sort((extA, extB) => {
      const defaultPriority = RicosNodeHOCManager.DEFAULT_PRIORITY;
      const extAPriority = extA.priority || defaultPriority;
      const extBPriority = extB.priority || defaultPriority;

      if (extAPriority > extBPriority) {
        return -1;
      }

      if (extAPriority < extBPriority) {
        return 1;
      }
      return 0;
    });
  }

  getHOCsByNodeName = name => {
    const nodeViewsHOCsByType = this.nodeHOCsMap[name] || [];
    const nodeViewsHOCsForAll = this.nodeHOCsMap['*'] || [];
    return RicosNodeHOCManager.sort([...nodeViewsHOCsForAll, ...nodeViewsHOCsByType]);
  };

  applyNodeHOCs = (nodeName, Component) => {
    const nodeHOCs = this.getHOCsByNodeName(nodeName);
    return pipe(nodeHOCs.slice().reverse())(Component);
  };
}
