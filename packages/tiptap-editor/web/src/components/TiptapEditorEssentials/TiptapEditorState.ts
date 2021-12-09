import { Editor } from '@tiptap/react';
import { IRicosEditorState } from 'wix-rich-content-common';

export class TiptapEditorState implements IRicosEditorState {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  hasFocus: IRicosEditorState['hasFocus'] = () => this.editor.isFocused;
}
