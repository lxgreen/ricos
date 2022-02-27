import type { ParagraphNode } from 'ricos-content';
import type { fromDraft as fromDraftFn } from 'ricos-content/libs/fromDraft';
import type { toDraft as toDraftFn } from 'ricos-content/libs/toDraft';
import type { IDraftEditorStateTranslator } from '../../models/draft-editor-state-translator';
import type { EditablesRepository } from '../../models/editable-content';
import type { NodeDescriptorManager } from '../../models/editable-node-descriptor';
import { EditableParagraphs } from '../nodes/editable-paragraphs';

type toDraft = typeof toDraftFn;
type fromDraft = typeof fromDraftFn;

export class DraftContentRepository implements EditablesRepository {
  editor: IDraftEditorStateTranslator;

  toDraft: toDraft;

  fromDraft: fromDraft;

  constructor(editor: IDraftEditorStateTranslator, toDraft: toDraft, fromDraft: fromDraft) {
    this.editor = editor;
    this.toDraft = toDraft;
    this.fromDraft = fromDraft;
  }

  getEditables(): EditableParagraphs {
    const draftContent = this.editor.getDraftContent();
    const selectedBlocksKeys = this.editor.getSelectedBlocksKeys();
    const richContent = this.fromDraft(draftContent);
    const paragraphs = EditableParagraphs.of(richContent.nodes as ParagraphNode[]);
    return paragraphs.setSelection(selectedBlocksKeys);
  }

  commit(descriptorManager: NodeDescriptorManager): void {
    const nodes = descriptorManager
      .getDescriptors()
      .getModified()
      .getNodes()
      .map(node => node.getRefinedNode());
    const draftBlocks = this.toDraft({ nodes });
    this.editor.setBlocks(draftBlocks);
  }
}
