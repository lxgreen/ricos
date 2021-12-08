import { Node, Decoration_Type } from 'ricos-schema';

export interface IRicosEditorEssentials {
  model: IRicosEditorModel;
  state: IRicosEditorState;
  commands: IRicosEditorCommands;
}

export interface IRicosEditorCommands {
  insertNode: (node: Node) => string;
  updateNode: (id: string, node: Node) => boolean;
  deleteNode: (id: string) => boolean;
}

export interface IRicosEditorModel {
  getNodesBy: (predicate: (node: Node) => boolean) => Node[];
  getSelectedNodes: () => Node[];
  hasDecoration: (type: Decoration_Type) => boolean;
}

export interface IRicosEditorState {
  hasFocus: () => boolean;
}
