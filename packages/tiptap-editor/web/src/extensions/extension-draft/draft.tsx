import React from 'react';
import { tiptapNodeDataToDraft } from '../../converters';
import toConstantCase from 'to-constant-case';
import { Node_Type } from 'ricos-schema';

const name = 'draft';

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

  return Draft;
};

export const createDraftConfig = () => ({
  type: 'extension',
  createExtensionConfig: () => {
    return {
      name,
      priority: 1,
      addNodeViewHOC() {
        return {
          nodeTypes: ['*'],
          nodeViewHOC: DraftHOC,
        };
      },
    };
  },
});
