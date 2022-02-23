/* eslint-disable brace-style */
import type { RicosNodesRepository } from '../../models/ricos-content';
import type { IDraftEditorStateTranslator } from '../../models/draft-editor-state-translator';
import type { RicosParagraphNodes } from '../nodes/ricos-paragraph-nodes';
import type { DescriptorManager } from '../../models/ricos-descriptor';

export class DraftContentRepositoryMock implements RicosNodesRepository {
  editor?: IDraftEditorStateTranslator;

  constructor(editor?: IDraftEditorStateTranslator) {
    this.editor = editor;
  }

  getRicosNodes(): RicosParagraphNodes {
    throw new Error('Method not implemented.');
  }

  commit(descriptorManager: DescriptorManager): void {
    throw new Error('Method not implemented.');
  }
}
