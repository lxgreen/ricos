import { EditorState } from 'wix-rich-content-editor-common';
import { IRicosEditorModel } from 'wix-rich-content-common';
import { fromDraft } from 'ricos-content/libs/migrateSchema';
import { convertToRaw } from '../../../lib/editorStateConversion';
type GetEditorState = () => EditorState;

export class DraftEditorModel implements IRicosEditorModel {
  getEditorState: GetEditorState;

  constructor(getEditorState: GetEditorState) {
    this.getEditorState = getEditorState;
  }

  getNodesBetween: IRicosEditorModel['getNodesBetween'] = (startIndex, endIndex) => {
    const contentState = this.getEditorState().getCurrentContent();
    const richContent = fromDraft(convertToRaw(contentState));
    return richContent.nodes.slice(startIndex, endIndex + 1);
  };

  getNodeBy: IRicosEditorModel['getNodeBy'] = predicate => {
    const contentState = this.getEditorState().getCurrentContent();
    const richContent = fromDraft(convertToRaw(contentState));
    return richContent.nodes.filter(predicate);
  };
}
