import { Node as _Node, Node_Type as _Node_Type } from 'ricos-schema';

type Node_Type =
  | _Node_Type.DIVIDER
  | _Node_Type.IMAGE
  | _Node_Type.GALLERY
  | _Node_Type.FILE
  | _Node_Type.GIF
  | _Node_Type.HTML
  | _Node_Type.VIDEO;

// Override Node_Type for current implementation
interface Node extends Omit<_Node, 'type'> {
  type: Node_Type;
}

export interface IRicosEditorCommands {
  insertNode: (node: Node) => string;
  updateNode: (id: string, node: Omit<Node, 'id'>) => void;
  deleteNode: (id: string) => void;
}
