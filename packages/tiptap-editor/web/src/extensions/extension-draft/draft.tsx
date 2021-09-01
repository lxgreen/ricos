import React from 'react';
import { tiptapNodeDataToDraft } from '../../converters';

const name = 'draft';

const DraftHOC = Component => {
  const Draft = props => {
    const { componentData, node } = props;
    const data = tiptapNodeDataToDraft(node.type.name.toUpperCase(), componentData);
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
