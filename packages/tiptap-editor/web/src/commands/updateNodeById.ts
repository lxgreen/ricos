import type { RawCommands } from '@tiptap/core';
import { findNodeById } from '../helpers';

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
    const nodesWithPos = findNodeById(tr, id);
    if (nodesWithPos.length > 0) {
      const { pos } = nodesWithPos[0];
      tr.setNodeMarkup(pos, undefined, { id, ...attrs });
      return true;
    } else {
      console.error('Failed to find node by id');
      return false;
    }
  };
