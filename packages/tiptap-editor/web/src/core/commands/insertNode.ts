import { RawCommands } from '@tiptap/core';
import { generateId } from 'ricos-content';
import { toTiptap } from '../../converters';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    insertNode: {
      /**
       * Insert a node.
       */
      insertNode: (type, attrs, content) => ReturnType;
    };
  }
}

export const insertNode: RawCommands['insertNode'] = (type, attrs = {}, content = []) => ({
  commands,
}) => {
  const id = generateId();
  return commands.insertContent({ type, attrs: { id, ...toTiptap(attrs) }, content });
};
