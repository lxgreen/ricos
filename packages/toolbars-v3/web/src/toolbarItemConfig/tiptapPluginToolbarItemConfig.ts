import { isPluginSelectedResolver } from '../resolvers/tiptapResolvers';
import { TrashIcon } from '../icons';
import type { IToolbarItemConfigTiptap } from '../types';

export const tiptapPluginToolbarConfig: IToolbarItemConfigTiptap[] = [
  {
    id: 'delete',
    type: 'toggle',
    presentation: {
      tooltip: 'Delete',
      icon: TrashIcon,
    },
    attributes: {
      visible: isPluginSelectedResolver,
    },
    commands: {
      delete:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().deleteSelection().run();
        },
    },
  },
];
