import { Editor } from '@tiptap/react';
import { IRicosEditorState } from 'wix-rich-content-common'; // eslint-disable-line prettier/prettier

export class TiptapEditorState implements IRicosEditorState {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  hasFocus: IRicosEditorState['hasFocus'] = () => this.editor.view.hasFocus();
}
