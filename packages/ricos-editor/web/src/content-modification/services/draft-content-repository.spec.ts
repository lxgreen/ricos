import type { Decoration } from 'ricos-schema';
import { Node_Type, TextStyle_TextAlignment, Decoration_Type } from 'ricos-schema';
import { DraftContentRepository } from './draft-content-repository';
import { DraftEditorStateTranslatorMock } from '../../content-conversion/draft-editor-state-translator-mock';
import { toDraft } from 'ricos-content/libs/toDraft';
import { fromDraft } from 'ricos-content/libs/fromDraft';
import type { ParagraphNode } from 'ricos-content';

const decoration: Decoration = { type: Decoration_Type.BOLD, fontWeightValue: 700 };

describe('Draft Content Repository', () => {
  const richContent = {
    nodes: [
      {
        type: Node_Type.PARAGRAPH,
        id: 'foo',
        nodes: [
          {
            type: Node_Type.TEXT,
            id: '',
            nodes: [],
            textData: {
              text: 'Hello',
              decorations: [],
            },
          },
          {
            type: Node_Type.TEXT,
            id: '',
            nodes: [],
            textData: {
              text: 'Shalom',
              decorations: [
                {
                  type: Decoration_Type.UNDERLINE,
                  underlineData: true,
                },
              ],
            },
          },
        ],
        paragraphData: {
          textStyle: {
            textAlignment: TextStyle_TextAlignment.AUTO,
          },
          indentation: 0,
        },
      },
      {
        type: Node_Type.PARAGRAPH,
        id: 'ddi6b',
        nodes: [
          {
            type: Node_Type.TEXT,
            id: '',
            nodes: [],
            textData: {
              text: 'World',
              decorations: [],
            },
          },
          {
            type: Node_Type.TEXT,
            id: '',
            nodes: [],
            textData: {
              text: 'Globe',
              decorations: [
                {
                  type: Decoration_Type.BOLD,
                  fontWeightValue: 700,
                },
              ],
            },
          },
        ],
        paragraphData: {
          textStyle: {
            textAlignment: TextStyle_TextAlignment.AUTO,
          },
          indentation: 0,
        },
      },
    ],
  };

  const draftContent = toDraft(richContent);

  it('Should filter only selected nodes', () => {
    const selectedBlocksKeys = ['foo'];
    const editor = new DraftEditorStateTranslatorMock(draftContent, selectedBlocksKeys);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosParagraphContent = repo.getRicosNodes();
    const selectedRicosNodes = ricosParagraphContent.filter(node => node.getSelection());
    const nodes = selectedRicosNodes.asArray();
    const nodeIds = nodes.map(node => node.getId());
    expect(nodeIds).toStrictEqual(['foo']);
  });

  it('Should filter only selected nodes', () => {
    const editor = new DraftEditorStateTranslatorMock(draftContent);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosNodes = repo.getRicosNodes();
    // command - set selection - filter modify
    const nodes = ricosNodes.setSelection(['ddi6b']);
    const selectedNodes = nodes.filter(node => node.getSelection());
    const nodeIds = selectedNodes.asArray().map(node => node.getId());
    expect(nodeIds).toStrictEqual(['ddi6b']);
  });

  it('Should set decoration to selected nodes', () => {
    const selectedBlocksKeys = ['ddi6b'];
    const editor = new DraftEditorStateTranslatorMock(draftContent, selectedBlocksKeys);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosNodes = repo.getRicosNodes();
    // command - set decoration bold
    const selectedNodes = ricosNodes.filter(node => node.getSelection());
    const selectedNodesWithDecoration = selectedNodes.setDecoration(decoration);
    const nodeIds = selectedNodesWithDecoration
      .filter(node =>
        node
          .getNodes()
          .asArray()
          .every(node => node.getData().decorations.includes(decoration))
      )
      .asArray()
      .map(node => node.getId());
    expect(nodeIds).toStrictEqual(['ddi6b']);
  });

  it('Should set change add to selected node', () => {
    const selectedBlocksKeys = ['ddi6b'];
    const editor = new DraftEditorStateTranslatorMock(draftContent, selectedBlocksKeys);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosNodes = repo.getRicosNodes();
    // command - insert node
    const node: ParagraphNode = {
      type: Node_Type.PARAGRAPH,
      id: 'xvi6b',
      nodes: [
        {
          type: Node_Type.TEXT,
          id: '',
          nodes: [],
          textData: {
            text: 'Hello',
            decorations: [decoration],
          },
        },
      ],
      paragraphData: {
        textStyle: {
          textAlignment: TextStyle_TextAlignment.AUTO,
        },
        indentation: 0,
      },
    };
    const newRicosNodes = ricosNodes.insert(node);
    const added = newRicosNodes.getDescriptors().getAdded();
    const nodeIds = added.getNodes().map(node => node.getId());
    expect(nodeIds).toStrictEqual(['xvi6b']);
  });

  it('Should set change update to selected node', () => {
    const selectedBlocksKeys = ['ddi6b'];
    const editor = new DraftEditorStateTranslatorMock(draftContent, selectedBlocksKeys);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosNodes = repo.getRicosNodes();
    // command - update node
    const selectedNodes = ricosNodes.filter(node => node.getSelection());
    const newRicosNodes = selectedNodes.modify(node => node.setDecoration(decoration));
    const modified = newRicosNodes.getDescriptors().getModified();
    const nodeIds = modified.getNodes().map(node => node.getId());
    expect(nodeIds).toStrictEqual(['ddi6b']);
  });

  it('Should set change delete to selected node', () => {
    const selectedBlocksKeys = ['ddi6b'];
    const editor = new DraftEditorStateTranslatorMock(draftContent, selectedBlocksKeys);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosNodes = repo.getRicosNodes();
    // command - delete node
    const selectedNodes = ricosNodes.filter(node => node.getSelection());
    const newRicosNodes = selectedNodes.delete();
    const deleted = newRicosNodes.getDescriptors().getDeleted();
    const nodeIds = deleted.getNodes().map(node => node.getId());
    expect(nodeIds).toStrictEqual(['ddi6b']);
  });

  it('Should set bold to selected node', () => {
    const selectedBlocksKeys = ['ddi6b'];
    const editor = new DraftEditorStateTranslatorMock(draftContent, selectedBlocksKeys);
    const repo = new DraftContentRepository(editor, toDraft, fromDraft);
    const ricosNodes = repo.getRicosNodes();
    // command - set bold to selected nodes
    const selectedNodes = ricosNodes.filter(node => node.getSelection());
    const selectedNodesWithBold = selectedNodes.setDecoration(decoration);
    repo.commit(selectedNodesWithBold);
    const richContent = fromDraft(editor.draftContent);
    const nodes = richContent.nodes.filter(node => node.id === 'ddi6b');
    const actual = nodes[0].nodes.every(node =>
      node.textData?.decorations.some(currDecoration => currDecoration.type === decoration.type)
    );
    expect(actual).toBeTruthy();
  });
});
