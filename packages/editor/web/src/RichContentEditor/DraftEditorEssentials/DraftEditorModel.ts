import {
  EditorState,
  getSelectedBlocks,
  ContentState,
  hasInlineStyle,
} from 'wix-rich-content-editor-common';
import { IRicosEditorModel } from 'wix-rich-content-common';
import { fromDraft } from 'ricos-content/libs/migrateSchema';
import { convertToRaw } from '../../../lib/editorStateConversion';
type GetEditorState = () => EditorState;

export class DraftEditorModel implements IRicosEditorModel {
  getEditorState: GetEditorState;

  constructor(getEditorState: GetEditorState) {
    this.getEditorState = getEditorState;
  }

  hasDecoration: IRicosEditorModel['hasDecoration'] = type => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasInlineStyle(type.toLowerCase() as any, this.getEditorState());
  };

  getSelectedNodes: IRicosEditorModel['getSelectedNodes'] = () => {
    const selectedBlocks = getSelectedBlocks(this.getEditorState());
    const contentState = ContentState.createFromBlockArray(selectedBlocks);
    return fromDraft(convertToRaw(contentState)).nodes;
  };
}
