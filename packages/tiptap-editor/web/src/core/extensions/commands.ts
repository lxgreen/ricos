import { Extension } from '@tiptap/core';
import * as insertNode from '../commands/insertNode';
import * as updateNodeById from '../commands/updateNodeById';
import * as deleteNode from '../commands/deleteNode';

export const Commands = Extension.create({
  name: 'commands',

  addCommands() {
    return {
      ...insertNode,
      ...updateNodeById,
      ...deleteNode,
    };
  },
});
