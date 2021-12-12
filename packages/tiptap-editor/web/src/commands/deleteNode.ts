import { RawCommands, findChildren } from '@tiptap/core';
import { NodeType } from 'prosemirror-model';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    deleteNode: {
      /**
       * delete a node.
       */
      deleteNode: (id: string | NodeType) => ReturnType;
    };
  }
}

export const deleteNode: RawCommands['deleteNode'] = id => ({ view, tr }) => {
  const nodeWithPos = findChildren(view.state.doc, node => node.attrs.id === id);
  const { pos, node } = nodeWithPos?.[0] || {};
  if (pos !== undefined) {
    view.dispatch(tr.delete(pos, pos + node.nodeSize));
    return true;
  } else {
    return false;
  }
};
