import { RawCommands, findChildren } from '@tiptap/core';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    updateNodeAttrsById: {
      /**
       * Update node attributes by node id.
       */
      updateNodeAttrsById: (id, attrs) => ReturnType;
    };
  }
}

export const updateNodeAttrsById: RawCommands['updateNodeAttrsById'] = (id, attrs = {}) => ({
  view,
}) => {
  const nodeWithPos = findChildren(view.state.doc, node => node.attrs.id === id);
  const { pos } = nodeWithPos?.[0] || {};
  if (pos) {
    view.dispatch(view.state.tr.setNodeMarkup(pos, undefined, attrs));
    return true;
  } else {
    console.error('Failed to find node by blockKey');
    return false;
  }
};
