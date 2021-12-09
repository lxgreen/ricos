import {
  createBlock,
  deleteBlock,
  EditorState,
  SelectionState,
  blockKeyToEntityKey,
  setEntityData,
} from 'wix-rich-content-editor-common';
import { IRicosEditorCommands } from 'wix-rich-content-common';
import { FROM_RICOS_ENTITY_TYPE } from 'ricos-content/libs/toDraftData';

type DraftEditorCommandsProps = {
  getEditorState: () => EditorState;
  setEditorState: (editorState: EditorState) => void;
  convertNodeToDraftData;
};

export class DraftEditorCommands implements IRicosEditorCommands {
  getEditorState: () => EditorState;

  setEditorState: (editorState: EditorState, selection: SelectionState) => void;

  convertNodeToDraftData;

  constructor(props: DraftEditorCommandsProps) {
    this.getEditorState = props.getEditorState;
    this.setEditorState = (editorState, selection) =>
      props.setEditorState(EditorState.forceSelection(editorState, selection));
    this.convertNodeToDraftData = props.convertNodeToDraftData;
  }

  insertNode: IRicosEditorCommands['insertNode'] = node => {
    const draftType = FROM_RICOS_ENTITY_TYPE[node.type];
    const draftData = this.convertNodeToDraftData(node);
    const { newBlock, newSelection, newEditorState } = createBlock(
      this.getEditorState(),
      draftData,
      draftType
    );
    this.setEditorState(newEditorState, newSelection);
    return newBlock.getKey();
  };

  updateNode: IRicosEditorCommands['updateNode'] = (id, node) => {
    const draftData = this.convertNodeToDraftData({ ...node, id });
    const entityKey = blockKeyToEntityKey(this.getEditorState(), id);
    if (!entityKey) {
      return false;
    }
    const newEditorState = setEntityData(this.getEditorState(), entityKey, draftData);
    const newSelection = newEditorState.getSelection();
    this.setEditorState(newEditorState, newSelection);
    return true;
  };

  deleteNode: IRicosEditorCommands['deleteNode'] = id => {
    const editorState = deleteBlock(this.getEditorState(), id);
    if (!editorState) {
      return false;
    }
    const selection = editorState.getSelection();
    this.setEditorState(editorState, selection);
    return true;
  };
}
