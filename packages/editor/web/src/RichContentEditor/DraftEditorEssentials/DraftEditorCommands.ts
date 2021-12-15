/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBlock,
  deleteBlock,
  EditorState,
  SelectionState,
  blockKeyToEntityKey,
  setEntityData,
} from 'wix-rich-content-editor-common';
import { IRicosEditorCommands } from 'wix-rich-content-common';
import { Node, Node_Type } from 'ricos-schema';

type toDraftData = (node: Node) => any;

type toDraftType = (node: Node_Type) => any;

type DraftEditorCommandsProps = {
  getEditorState: () => EditorState;
  setEditorState: (editorState: EditorState) => void;
  toDraftData: toDraftData;
  toDraftType: toDraftType;
};

export class DraftEditorCommands implements IRicosEditorCommands {
  getEditorState: () => EditorState;

  setEditorState: (editorState: EditorState, selection: SelectionState) => void;

  toDraftData: toDraftData;

  toDraftType: toDraftType;

  constructor(props: DraftEditorCommandsProps) {
    this.getEditorState = props.getEditorState;
    this.setEditorState = (editorState, selection) =>
      props.setEditorState(EditorState.forceSelection(editorState, selection));
    this.toDraftData = props.toDraftData;
    this.toDraftType = props.toDraftType;
  }

  insertNode: IRicosEditorCommands['insertNode'] = node => {
    const draftType = this.toDraftType[node.type];
    const draftData = this.toDraftData(node);
    const { newBlock, newSelection, newEditorState } = createBlock(
      this.getEditorState(),
      draftData,
      draftType
    );
    this.setEditorState(newEditorState, newSelection);
    return newBlock.getKey();
  };

  updateNode: IRicosEditorCommands['updateNode'] = (id, node) => {
    const draftData = this.toDraftData({ ...node, id });
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
