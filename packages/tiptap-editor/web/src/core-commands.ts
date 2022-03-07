import * as insertNode from './commands/insertNode';
import * as updateNodeById from './commands/updateNodeById';
import * as replaceNode from './commands/replaceNode';
import * as replaceNodes from './commands/replaceNodes';
import * as deleteNode from './commands/deleteNode';
import type { RicosExtension } from 'ricos-tiptap-types';

export const createCommandsConfig = (): RicosExtension => ({
  type: 'extension' as const,
  groups: [],
  createExtensionConfig: () => ({
    name: 'ricos-node-commands',
    addCommands() {
      return {
        ...insertNode,
        ...updateNodeById,
        ...deleteNode,
        ...replaceNode,
        ...replaceNodes,
      };
    },
  }),
});
