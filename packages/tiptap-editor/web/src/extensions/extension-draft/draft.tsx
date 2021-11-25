import React from 'react';
import { tiptapNodeDataToDraft } from '../../content-utils';
import { RicosFunctionalExtension } from '../../models/extension-types';
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

  Draft.displayName = 'ToDraftHoc';
  return Draft;
};

export const createDraftConfig = (): RicosFunctionalExtension => ({
  type: 'extension',
  createExtensionConfig: () => {
    return {
      name,
      priority: 1,
      addNodeHoc() {
        return {
          priority: 100,
          nodeTypes: ['*'],
          nodeHoc: DraftHOC,
        };
      },
    };
  },
});
