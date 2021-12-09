import { EditorState } from 'wix-rich-content-editor-common';
import { IRicosEditorState } from 'wix-rich-content-common';
type GetEditorState = () => EditorState;

type DraftEditorStateProps = { getEditorState: GetEditorState };
export class DraftEditorState implements IRicosEditorState {
  getEditorState: GetEditorState;

  constructor(props: DraftEditorStateProps) {
    this.getEditorState = props.getEditorState;
  }

  hasFocus: IRicosEditorState['hasFocus'] = () =>
    this.getEditorState()
      .getSelection()
      .getHasFocus();
}
