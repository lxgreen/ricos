import React from 'react';
import type { Node_Type } from 'ricos-schema';
import type { RicosExtension } from 'ricos-tiptap-types';
import toConstantCase from 'to-constant-case';
import { tiptapNodeDataToDraft } from './content-utils';

const DraftHOC = Component => {
  const Draft = props => {
    const { componentData, node } = props;
    const ricosNodeType = toConstantCase(node.type.name) as Node_Type;
    const data = tiptapNodeDataToDraft(ricosNodeType, componentData);
    const newProps = {
      ...props,
      componentData: data,
    };
    return <Component {...newProps} />;
  };

  Draft.displayName = 'ToDraftHoc';
  return Draft;
};

export const createDraftConfig = (): RicosExtension => ({
  type: 'extension' as const,
  groups: [],
  name: 'draft',
  createExtensionConfig() {
    return {
      name: this.name,
      priority: 1,
      addNodeHoc() {
        return {
          priority: 9,
          nodeTypes: ['*'],
          nodeHoc: DraftHOC,
        };
      },
    };
  },
});
