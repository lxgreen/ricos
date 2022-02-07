// // import { ContentResolver } from './ContentResolver';
// import { BoldIcon, ItalicIcon } from '../icons';
// import { isTextInSelection } from '../resolvers/tiptapResolvers';
// import type { IToolbarItemConfig } from '../types';

// export const tiptapStaticToolbarConfig: IToolbarItemConfig[] = [
//   {
//     id: 'bold',
//     type: 'toggle',
//     presentation: {
//       tooltip: 'Bold',
//       icon: BoldIcon,
//     },
//     attributes: {
//       visible: isTextInSelection,
//       // active: isContainsBold,
//     },
//     commands: {
//       click:
//         ({ attributes, editorCommands }) =>
//         e => {
//           editorCommands.chain().focus().toggleBold().run();
//         },
//     },
//   },
// ];
