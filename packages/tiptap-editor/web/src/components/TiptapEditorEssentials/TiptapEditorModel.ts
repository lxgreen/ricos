import { Editor } from '@tiptap/react';
import { IRicosEditorModel } from 'wix-rich-content-common';
import { fromTiptap } from 'wix-tiptap-extensions';

export class TiptapEditorModel implements IRicosEditorModel {
  editor: Editor;

  constructor(editorState: Editor) {
    this.editor = editorState;
  }

  getNodesBy: IRicosEditorModel['getNodesBy'] = predicate => {
    const tiptapDoc = this.editor.getJSON();
    const allNodes = fromTiptap(tiptapDoc).nodes;
    return allNodes.filter(predicate);
  };

  getSelectedNodes: IRicosEditorModel['getSelectedNodes'] = () => {
    const tiptapDoc = this.editor.getJSON();
    tiptapDoc.content = this.editor.state.selection.content().toJSON()?.content;
    return fromTiptap(tiptapDoc).nodes;
  };

  hasDecoration: IRicosEditorModel['hasDecoration'] = type => {
    return this.editor.isActive(type.toLowerCase());
  };
}
