import { Editor } from '@tiptap/react';
import { IRicosEditorModel } from 'ricos-common';
import { fromTiptap } from '../../content-utils/fromTiptap/fromTiptap';

export class TiptapEditorModel implements IRicosEditorModel {
  editor: Editor;

  constructor(editorState: Editor) {
    this.editor = editorState;
  }

  getSelectedNodes: IRicosEditorModel['getSelectedNodes'] = () => {
    const tiptapDoc = this.editor.getJSON();
    tiptapDoc.content = this.editor.state.selection.content().toJSON()?.content;
    return fromTiptap(tiptapDoc).nodes;
  };

  hasDecoration: IRicosEditorModel['hasDecoration'] = type => {
    return this.editor.isActive(type.toLowerCase());
  };
}
