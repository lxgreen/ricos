import React, { useEffect, ComponentType } from 'react';
import { RicosFunctionalExtension } from '../../models/extension-types';
import { NodeSelection } from 'prosemirror-state';
import { TIPTAP_TYPE_TO_RICOS_TYPE } from '../../consts';

const name = 'on-node-focus';

const OnNodeFocusHoc = (Component: ComponentType) => {
  const onNodeFocus = props => {
    const { node, componentData, context, isFocused, editor } = props;
    useEffect(() => {
      const { selection } = editor.view.state;
      if (selection instanceof NodeSelection && isFocused && context.onAtomicBlockFocus) {
        context.onAtomicBlockFocus({
          blockKey: node.attrs.id,
          type: TIPTAP_TYPE_TO_RICOS_TYPE[node.type.name],
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
