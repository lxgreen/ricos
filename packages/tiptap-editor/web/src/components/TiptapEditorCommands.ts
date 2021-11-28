import { IRicosEditorCommands, generateId } from 'wix-rich-content-common';
import { Editor } from '@tiptap/core';
import { toTiptap } from '..';
import { FROM_RICOS_NODE_TYPE_TO_TIPTAP_TYPE } from '../consts';

export class TiptapEditorCommands implements IRicosEditorCommands {
  constructor(private editor: Editor) {
    this.editor = editor;
  }

  insertNode: IRicosEditorCommands['insertNode'] = node => {
    const type = FROM_RICOS_NODE_TYPE_TO_TIPTAP_TYPE[node.type];
    const id = generateId();
    const attrs = toTiptap({ ...node, id }).attrs as Record<string, unknown>;
    this.editor.commands.insertNode(type, attrs);
    return id;
  };

  updateNode: IRicosEditorCommands['updateNode'] = (id, node) => {
    const attrs = toTiptap(node).attrs as Record<string, unknown>;
    return this.editor.commands.updateNodeById(id, attrs);
  };

  deleteNode: IRicosEditorCommands['deleteNode'] = id => {
    return this.editor.commands.deleteNode(id);
  };
}
