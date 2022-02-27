/* eslint-disable brace-style */
import type { IDraftEditorStateTranslator } from '../../models/draft-editor-state-translator';
import type { EditablesRepository } from '../../models/editable-repository';
import type { NodeDescriptorManager } from '../../models/editable-node-descriptor';

export class DraftContentRepositoryMock implements EditablesRepository {
  editor?: IDraftEditorStateTranslator;

  constructor(editor?: IDraftEditorStateTranslator) {
    this.editor = editor;
  }

  getEditables() {
    throw new Error('Method not implemented.');
  }

  commit(descriptorManager: NodeDescriptorManager): void {
    throw new Error('Method not implemented.');
  }
}
