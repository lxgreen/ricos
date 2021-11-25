import { RawCommands } from '@tiptap/core';
import { generateId } from 'ricos-content';
import { toTiptap } from '../../content-utils';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    insertNode: {
      /**
       * Insert a node.
       */
      insertNode: (type: string, attrs: Record<string, unknown>) => ReturnType;
    };
  }
}

export const insertNode: RawCommands['insertNode'] = (type, attrs = {}) => ({ commands }) => {
  return commands.insertContent({
    type,
    attrs: { id: attrs.id || generateId(), ...attrs },
  });
};
