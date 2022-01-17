import type { RawCommands } from '@tiptap/core';
import { findChildren } from '@tiptap/core';

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

export const updateNodeById: RawCommands['updateNodeById'] =
  (id, attrs = {}) =>
  ({ tr }) => {
    const predicate = node => node.attrs.id === id;
    const nodesWithPos = findChildren(tr.doc, predicate);

    if (nodesWithPos.length > 0) {
      const { pos } = nodesWithPos[0];
      tr.setNodeMarkup(pos, undefined, { id, ...attrs });
      return true;
    } else {
      console.error('Failed to find node by id');
      return false;
    }
  };
