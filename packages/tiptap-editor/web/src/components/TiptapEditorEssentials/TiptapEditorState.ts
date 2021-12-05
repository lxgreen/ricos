import { Editor } from '@tiptap/react';
import { /*type*/ IRicosEditorState } from 'wix-rich-content-common'; // eslint-disable-line prettier/prettier
import { fromTiptap } from '../../content-utils/fromTiptap/fromTiptap';

export class TiptapEditorState implements IRicosEditorState {
  editor: Editor;

  constructor(editor: Editor) {
    this.editor = editor;
  }

  getSelection: IRicosEditorState['getSelection'] = () => {
    const selection = this.editor.state.selection;
    const startId = selection.$from.node().toJSON().attrs.id;
    const endId = selection.$head.node().toJSON().attrs.id;

    return {
      startId,
      endId,
      isCollapsed: selection.empty,
    };
  };

  hasFocus: IRicosEditorState['hasFocus'] = () => this.editor.view.hasFocus();
}
