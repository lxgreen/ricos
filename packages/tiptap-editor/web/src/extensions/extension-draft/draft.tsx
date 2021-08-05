import { Node_Type } from 'ricos-schema';
import { createRicosExtensionConfig } from './../../extensions-creators/extension';
import React from 'react';
import { tiptapNodeDataToDraft } from '../../converters';

const name = 'draft';

export const createDraftConfig = () =>
  createRicosExtensionConfig({
    createConfig: () => {
      return {
        name,
        priority: 100000,
        addNodeViewHOC() {
          return {
            nodeTypes: ['*'],
            nodeViewHOC: Component => {
              return props => {
                const { componentData, node } = props;
                const data = tiptapNodeDataToDraft(
                  node.type.name.toUpperCase() as Node_Type,
                  componentData
                );
                const newProps = {
                  ...props,
                  componentData: data,
                };
                return <Component {...newProps} />;
              };
            },
          };
        },
      };
    },
  });
