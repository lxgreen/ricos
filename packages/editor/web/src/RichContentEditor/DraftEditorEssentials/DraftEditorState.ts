import { EditorState } from 'wix-rich-content-editor-common';
import { IRicosEditorState } from 'wix-rich-content-common';
type GetEditorState = () => EditorState;

export class DraftEditorState implements IRicosEditorState {
  getEditorState: GetEditorState;

  constructor(getEditorState: GetEditorState) {
    this.getEditorState = getEditorState;
  }

  hasFocus: IRicosEditorState['hasFocus'] = () =>
    this.getEditorState()
      .getSelection()
      .getHasFocus();
}
