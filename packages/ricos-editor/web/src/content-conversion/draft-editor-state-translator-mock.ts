import { convertToRaw, convertFromRaw } from 'wix-rich-content-editor/libs/editorStateConversion';
import type { DraftContent } from 'wix-rich-content-common';
import type { IDraftEditorStateTranslator } from '../models/draft-editor-state-translator';
import { EditorState } from 'draft-js';
import type { ContentState } from 'draft-js';

export class DraftEditorStateTranslatorMock implements IDraftEditorStateTranslator {
  draftContent: DraftContent;

  selectedBlocksKeys: string[];

  constructor(draftContent?, selectedBlocksKeys?) {
    this.draftContent = draftContent;
    this.selectedBlocksKeys = selectedBlocksKeys || [];
  }

  setEditorState: IDraftEditorStateTranslator['setEditorState'] = editorState => {
    this.draftContent = convertToRaw(editorState.getCurrentContent());
  };

  onChange: IDraftEditorStateTranslator['onChange'] = (_content, _editorState) => {
    throw new Error('Method not implemented.');
  };

  getDraftContent: IDraftEditorStateTranslator['getDraftContent'] = () => {
    return this.draftContent;
  };

  getSelectedBlocksKeys: IDraftEditorStateTranslator['getSelectedBlocksKeys'] = () => {
    return this.selectedBlocksKeys;
  };

  setBlocks: IDraftEditorStateTranslator['setBlocks'] = (blocks: DraftContent) => {
    const newBlockMap = (convertFromRaw(blocks) as ContentState).getBlockMap();
    const contentState: ContentState = convertFromRaw(this.draftContent);
    const blockMap = contentState.getBlockMap().merge(newBlockMap);
    const newContentState = contentState.merge({
      blockMap,
    }) as ContentState;
    this.setEditorState(EditorState.createWithContent(newContentState));
  };
}
