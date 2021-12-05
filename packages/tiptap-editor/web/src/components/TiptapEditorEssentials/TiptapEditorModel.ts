import { Editor } from '@tiptap/react';
import { IRicosEditorModel } from 'wix-rich-content-common';
import { fromTiptap } from '../../content-utils/fromTiptap/fromTiptap';

export class TiptapEditorModel implements IRicosEditorModel {
  editor: Editor;

  constructor(editorState: Editor) {
    this.editor = editorState;
  }

  getNodesBetween: IRicosEditorModel['getNodesBetween'] = (startIndex, endIndex) => {
    const richContent = fromTiptap(this.editor.getJSON());
    return richContent.nodes.slice(startIndex, endIndex + 1);
  };

  getNodeBy: IRicosEditorModel['getNodeBy'] = predicate => {
    const richContent = fromTiptap(this.editor.getJSON());
    return richContent.nodes.filter(predicate);
  };
}
