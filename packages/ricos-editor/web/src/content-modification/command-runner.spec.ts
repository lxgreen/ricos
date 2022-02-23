import type { ParagraphNode } from 'ricos-content';
import { Decoration_Type } from 'ricos-schema';
import type { CommandDescriptor } from '../models/command';
import type { RicosNodesRepository } from '../models/ricos-content';
import type { DescriptorManager } from '../models/ricos-descriptor';
import { EditorCommandRunner } from './command-runner';
import type { RicosParagraphNode } from './nodes/ricos-paragraph-node';
import { RicosParagraphNodes } from './nodes/ricos-paragraph-nodes';

const paragraph = {
  nodes: [
    {
      type: 'PARAGRAPH',
      nodes: [
        {
          type: 'TEXT',
          textData: {
            text: 'Hello World',
            decorations: [],
          },
        },
      ],
    },
  ],
};

const paragraphWithBold = {
  type: 'PARAGRAPH',
  nodes: [
    {
      type: 'TEXT',
      textData: {
        text: 'Hello World',
        decorations: [{ type: 'BOLD' }],
      },
    },
  ],
};

const mockedTranslate = jest.fn();

const repository: RicosNodesRepository = {
  commit: (descriptorManager: DescriptorManager) => {
    mockedTranslate(
      descriptorManager
        .getDescriptors()
        .getModified()
        .getNodes()
        .map(n => n.getRefinedNode())[0]
    );
  },
  // TODO: RicosParagraphNodes to be exposed as RicosContent.getParagraphs API
  // TODO: RefinedNode.of should involve validation/type guards
  getRicosNodes: () => RicosParagraphNodes.of(paragraph.nodes as unknown as ParagraphNode[]),
};

const setBoldCommand: CommandDescriptor = {
  name: 'setBold',
  execute:
    ({ model }) =>
    () =>
      model.modify((n: RicosParagraphNode) => n.setDecoration({ type: Decoration_Type.BOLD })),
};

// TODO: command composition test
describe('EditorCommandRunner', () => {
  it('should allow to run setBold command', () => {
    const runner = new EditorCommandRunner(repository);
    runner.register(setBoldCommand);
    const commands = runner.getCommands();
    // TODO: support commands autocomplete like in tiptap (name, args)
    // TODO: no parameter should be passed
    commands.setBold('');
    expect(mockedTranslate).lastCalledWith(paragraphWithBold);
  });
});
