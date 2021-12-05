import { EditorState } from 'wix-rich-content-editor-common';
import { IRicosEditorState } from 'wix-rich-content-common';
type GetEditorState = () => EditorState;

export class DraftEditorState implements IRicosEditorState {
  getEditorState: GetEditorState;

  constructor(getEditorState: GetEditorState) {
    this.getEditorState = getEditorState;
  }

  getSelection: IRicosEditorState['getSelection'] = () => {
    const selection = this.getEditorState().getSelection();
    const startId = selection.getStartKey();
    const endId = selection.getEndKey();

    return {
      startId,
      endId,
      isCollapsed: selection.isCollapsed(),
    };
  };

  hasFocus: IRicosEditorState['hasFocus'] = () =>
    this.getEditorState()
      .getSelection()
      .getHasFocus();
}
