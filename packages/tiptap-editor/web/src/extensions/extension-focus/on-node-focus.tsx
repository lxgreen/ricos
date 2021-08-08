import { createRicosGenericExtensionConfig } from './../../extensions-creators/extension';
import React, { useEffect, ComponentType } from 'react';

const name = 'on-node-focus';

export const createOnNodeFocusConfig = () =>
  createRicosGenericExtensionConfig({
    type: 'extension',
    createConfig: () => ({
      name,
      priority: 19,
      addNodeViewHOC: () => ({
        nodeTypes: ['*'],
        nodeViewHOC: (Component: ComponentType) => props => {
          const { node, componentData, context, isFocused } = props;
          useEffect(() => {
            if (isFocused && context.onAtomicBlockFocus) {
              context.onAtomicBlockFocus({
                blockKey: node.attrs.id, // TODO: id is missing
                type: node.type.name,
                data: componentData,
              });
            }
          }, [props.isFocused]);
          return <Component {...props} />;
        },
      }),
    }),
  });
