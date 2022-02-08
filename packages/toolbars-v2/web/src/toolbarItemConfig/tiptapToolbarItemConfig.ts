// import { ContentResolver } from './ContentResolver';
import { BoldIcon } from '../icons';
import { isTextInSelection } from '../resolvers/tiptapResolvers';
import type { IToolbarItemConfigTiptap } from '../types';
export const tiptapStaticToolbarConfig: IToolbarItemConfigTiptap[] = [
  {
    id: 'bold',
    type: 'toggle',
    presentation: {
      tooltip: 'Bold',
      icon: BoldIcon,
    },
    attributes: {
      visible: isTextInSelection,
    },
    commands: {
      click:
        ({ editorCommands }) =>
        () => {
          editorCommands.chain().focus().toggleBold().run();
        },
    },
  },
];
