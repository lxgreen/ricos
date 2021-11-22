import { Node } from 'ricos-schema';

export interface IRicosEditorCommands {
  insertNode: (node: Node) => string;
  updateNode: (id: string, node: Omit<Node, 'id'>) => void;
  deleteNode: (id: string) => void;
}
