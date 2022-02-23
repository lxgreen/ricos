import type { ParagraphNode } from 'ricos-content';
import type { fromDraft as fromDraftFn } from 'ricos-content/libs/fromDraft';
import type { toDraft as toDraftFn } from 'ricos-content/libs/toDraft';
import type { IDraftEditorStateTranslator } from '../../models/draft-editor-state-translator';
import type { RicosNodesRepository } from '../../models/ricos-content';
import type { DescriptorManager } from '../../models/ricos-descriptor';
import type { RicosParagraphNode } from '../nodes/ricos-paragraph-node';
import { RicosParagraphNodes } from '../nodes/ricos-paragraph-nodes';

type toDraft = typeof toDraftFn;
type fromDraft = typeof fromDraftFn;

export class DraftContentRepository implements RicosNodesRepository {
  editor: IDraftEditorStateTranslator;

  toDraft: toDraft;

  fromDraft: fromDraft;

  constructor(editor: IDraftEditorStateTranslator, toDraft: toDraft, fromDraft: fromDraft) {
    this.editor = editor;
    this.toDraft = toDraft;
    this.fromDraft = fromDraft;
  }

  getRicosNodes(): RicosParagraphNodes {
    const draftContent = this.editor.getDraftContent();
    const selectedBlocksKeys = this.editor.getSelectedBlocksKeys();
    const richContent = this.fromDraft(draftContent);
    const ricosNodes = RicosParagraphNodes.of(richContent.nodes as ParagraphNode[]);
    const withSelection = ricosNodes.setSelection(selectedBlocksKeys);
    return withSelection;
  }

  commit(descriptorManager: DescriptorManager): void {
    const nodes = (
      descriptorManager.getDescriptors().getModified().getNodes() as RicosParagraphNode[]
    ).map(node => node.getRefinedNode());
    const draftBlocks = this.toDraft({ nodes });
    this.editor.setBlocks(draftBlocks);
  }
}
