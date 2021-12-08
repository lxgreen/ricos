import { Editor } from '@tiptap/react';
import { IRicosEditorState } from 'ricos-common';

export class TiptapEditorState implements IRicosEditorState {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  hasFocus: IRicosEditorState['hasFocus'] = () => this.editor.view.hasFocus();
}
