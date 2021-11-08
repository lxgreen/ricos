import { RawCommands, findChildren } from '@tiptap/core';
import { toTiptap } from '../../content-utils';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    updateNodeById: {
      /**
       * Update node attributes by node id.
       */
      updateNodeById: (id, attrs) => ReturnType;
    };
  }
}

export const updateNodeById: RawCommands['updateNodeById'] = (id, attrs = {}) => ({ view, tr }) => {
  const nodeWithPos = findChildren(view.state.doc, node => node.attrs.id === id);
  const { pos } = nodeWithPos?.[0] || {};
  if (pos) {
    tr.setNodeMarkup(pos, undefined, toTiptap(attrs));
    return true;
  } else {
    console.error('Failed to find node by blockKey');
    return false;
  }
};
