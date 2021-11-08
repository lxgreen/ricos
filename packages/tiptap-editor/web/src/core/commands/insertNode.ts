import { RawCommands } from '@tiptap/core';
import { generateId } from 'ricos-content';
import { toTiptap } from '../../converters';

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
  const id = generateId();
  return commands.insertContent({ type, attrs: { id, ...toTiptap(attrs) } });
};
