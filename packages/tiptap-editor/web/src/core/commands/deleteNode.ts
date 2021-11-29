import { RawCommands, findChildren } from '@tiptap/core';

// declare module '@tiptap/core' {
//   interface Commands<ReturnType> {
//     deleteNode: {
//       /**
//        * delete a node.
//        */
//       deleteNode: (id: string) => ReturnType;
//     };
//   }
// }

export const deleteNode: RawCommands['deleteNode'] = id => ({ view, tr }) => {
  const nodeWithPos = findChildren(view.state.doc, node => node.attrs.id === id);
  const { pos, node } = nodeWithPos?.[0] || {};
  if (pos) {
    view.dispatch(tr.delete(pos, pos + node.nodeSize));
    return true;
  } else {
    console.error('Failed to delete node with specific key');
    return false;
  }
};
