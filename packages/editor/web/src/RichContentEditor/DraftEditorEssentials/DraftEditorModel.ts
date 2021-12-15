import {
  EditorState,
  getSelectedBlocks,
  ContentState,
  hasInlineStyle,
} from 'wix-rich-content-editor-common';
import { IRicosEditorModel, DraftContent } from 'wix-rich-content-common';
import { convertToRaw } from '../../../lib/editorStateConversion';
import { RichContent } from 'ricos-schema';
type GetEditorState = () => EditorState;

type DraftEditorModelProps = { getEditorState: GetEditorState; fromDraft };

export class DraftEditorModel implements IRicosEditorModel {
  getEditorState: GetEditorState;

  fromDraft: (draftJSON: DraftContent) => RichContent;

  constructor(props: DraftEditorModelProps) {
    this.getEditorState = props.getEditorState;
    this.fromDraft = props.fromDraft;
  }

  getNodesBy: IRicosEditorModel['getNodesBy'] = predicate => {
    const contentState = this.getEditorState().getCurrentContent();
    const allNodes = this.fromDraft(convertToRaw(contentState)).nodes;
    return allNodes.filter(predicate);
  };

  getSelectedNodes: IRicosEditorModel['getSelectedNodes'] = () => {
    const selectedBlocks = getSelectedBlocks(this.getEditorState());
    const contentState = ContentState.createFromBlockArray(selectedBlocks);
    return this.fromDraft(convertToRaw(contentState)).nodes;
  };

  hasDecoration: IRicosEditorModel['hasDecoration'] = type => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return hasInlineStyle(type.toLowerCase() as any, this.getEditorState());
  };
}
