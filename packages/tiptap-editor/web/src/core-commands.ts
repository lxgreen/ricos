import * as insertNode from './commands/insertNode';
import * as updateNodeById from './commands/updateNodeById';
import * as deleteNode from './commands/deleteNode';
import { RicosExtension } from 'ricos-tiptap-types';

export const createCommandsConfig = (): RicosExtension => ({
  type: 'extension' as const,
  createExtensionConfig: () => ({
    name: 'commands',
    addCommands() {
      return {
        ...insertNode,
        ...updateNodeById,
        ...deleteNode,
      };
    },
  }),
});
