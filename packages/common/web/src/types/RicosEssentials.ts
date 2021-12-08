import { Node, Node_Type, Decoration_Type } from 'ricos-schema';

type _Node_Type =
  | Node_Type.DIVIDER
  | Node_Type.IMAGE
  | Node_Type.GALLERY
  | Node_Type.FILE
  | Node_Type.GIF
  | Node_Type.HTML
  | Node_Type.VIDEO;

// Override Node_Type for current implementation
interface _Node extends Omit<Node, 'type'> {
  type: _Node_Type;
}

export interface IRicosEditorEssentials {
  model: IRicosEditorModel;
  state: IRicosEditorState;
  commands: IRicosEditorCommands;
}

export interface IRicosEditorCommands {
  insertNode: (node: _Node) => string;
  updateNode: (id: string, node: Omit<_Node, 'id'>) => void;
  deleteNode: (id: string) => void;
}

export interface IRicosEditorModel {
  getSelectedNodes: () => Node[];
  hasDecoration: (type: Decoration_Type) => boolean;
}

export interface IRicosEditorState {
  hasFocus: () => boolean;
}
