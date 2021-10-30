import { Extension } from '@tiptap/core';
import * as insertNode from '../commands/insertNode';
import * as updateNodeAttrsById from '../commands/updateNodeAttrsById';

export const Commands = Extension.create({
  name: 'commands',

  addCommands() {
    return {
      ...insertNode,
      ...updateNodeAttrsById,
    };
  },
});
