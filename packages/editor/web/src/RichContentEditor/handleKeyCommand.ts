/* eslint-disable no-restricted-globals */
import { DraftHandleValue, EditorProps } from '@wix/draft-js';
import { CommandHandler } from 'wix-rich-content-common';
import { COMMANDS, EditorState, mergeBlockData, RichUtils } from 'wix-rich-content-editor-common';
import handleBackspaceCommand from './handleBackspaceCommand';
import handleDeleteCommand from './handleDeleteCommand';
import handleTabCommand from './handleTabCommand';

const isTab = (command: string) => command === COMMANDS.TAB || command === COMMANDS.SHIFT_TAB;

const isUndoRedo = (command: string) => command === COMMANDS.UNDO || command === COMMANDS.REDO;

export default (
  updateEditorState: (editorState: EditorState) => void,
  customHandlers: Record<string, CommandHandler>,
  blockType: string,
  onBackspace?: (editorState: EditorState) => void
): EditorProps['handleKeyCommand'] => (command, editorState) => {
  let newState: EditorState | null;

  if (customHandlers[command]) {
    if (isTab(command)) {
      newState = handleTabCommand(editorState, blockType, customHandlers, command);
    } else if (isUndoRedo(command)) {
      // TODO: handleUndoCommand and handleRedoCommand return a DraftHandleValue, they should behave like any other CommandHandler (their updateEditorState should move here)
      return (customHandlers[command](editorState, event) as unknown) as DraftHandleValue;
    } else {
      newState = customHandlers[command](editorState, event) || null;
    }
  } else {
    switch (command) {
      case COMMANDS.ALIGN_RIGHT:
      case COMMANDS.ALIGN_LEFT:
      case COMMANDS.ALIGN_CENTER:
      case COMMANDS.JUSTIFY:
        newState = mergeBlockData(editorState, { textAlignment: command });
        break;
      case COMMANDS.TITLE:
      case COMMANDS.SUBTITLE:
      case COMMANDS.NUMBERED_LIST:
      case COMMANDS.BULLETED_LIST:
      case COMMANDS.BLOCKQUOTE:
      case COMMANDS.CODE:
        newState = RichUtils.toggleBlockType(editorState, command);
        break;
      case COMMANDS.BACKSPACE:
        onBackspace?.(editorState);
        newState = handleBackspaceCommand(editorState);
        break;
      case COMMANDS.DELETE:
        newState = handleDeleteCommand(editorState);
        break;
      default:
        newState = RichUtils.handleKeyCommand(editorState, command);
        break;
    }
  }

  if (newState) {
    updateEditorState(newState);
    return 'handled';
  }

  return 'not-handled';
};
