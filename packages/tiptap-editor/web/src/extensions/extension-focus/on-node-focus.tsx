import React, { useEffect, ComponentType } from 'react';
import { RicosFunctionalExtension } from '../../models/extension-types';

const name = 'on-node-focus';

const OnNodeFocusHoc = (Component: ComponentType) => {
  const onNodeFocus = props => {
    const { node, componentData, context, isFocused } = props;
    useEffect(() => {
      if (isFocused && context.onAtomicBlockFocus) {
        context.onAtomicBlockFocus({
          blockKey: node.attrs.id,
          type: node.type.name,
          data: componentData,
        });
      }
    }, [props.isFocused]);
    return <Component {...props} />;
  };
  onNodeFocus.displayName = 'OnNodeFocusHoc';
  return onNodeFocus;
};

export const createOnNodeFocusConfig = (): RicosFunctionalExtension => ({
  type: 'extension',
  createExtensionConfig: () => ({
    name,
    priority: 19,
    addNodeHoc: () => ({
      priority: 100,
      nodeTypes: ['*'],
      nodeHoc: OnNodeFocusHoc,
    }),
  }),
});
