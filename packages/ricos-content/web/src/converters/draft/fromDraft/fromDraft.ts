/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { cloneDeep, isEmpty } from 'lodash';
import { DraftContent, RicosContentBlock } from '../../../types';
import { BlockType, FROM_DRAFT_LIST_TYPE, HeaderLevel } from '../consts';
import { RichContent, Node, Node_Type, Decoration_Type } from 'ricos-schema';
import { generateId } from '../../generateRandomId';
import { getTextNodes } from './getTextNodes';
import { getEntity, getNodeStyle, getTextStyle } from './getRicosEntityData';
import { createParagraphNode, initializeMetadata } from '../../nodeUtils';
import { nestedNodesConverters } from './nestedNodesUtils';

export interface FromDraftOptions {
  ignoreUnsupportedValues?: boolean;
}

export const ensureRicosContent = (content: RichContent | DraftContent): RichContent =>
  'blocks' in content ? fromDraft(content) : content;

const cssToRicosDecoration = {
  color: (style: string) => {
    return { type: Decoration_Type.COLOR, colorData: { foreground: style } };
  },
  'background-color': (style: string) => {
    return { type: Decoration_Type.COLOR, colorData: { background: style } };
  },
  'font-weight': (style: string) => {
    return { type: Decoration_Type.BOLD, fontWeightValue: style === 'bold' ? 700 : 400 };
  },
  'font-style': (style: string) => {
    return { type: Decoration_Type.ITALIC, italicData: style === 'italic' };
  },
  'text-decoration': (style: string) => {
    return { type: Decoration_Type.UNDERLINE, underlineData: style === 'underline' };
  },
  'font-size': (style: string) => {
    return { type: Decoration_Type.FONT_SIZE, fontSize: style };
  },
};

const convertHeaderToInlineStyles = styles =>
  Object.entries(styles).map(([key, style]) => cssToRicosDecoration[key](style));

const parseDocStyle = documentStyle => {
  documentStyle &&
    Object.entries(documentStyle).forEach(([header, styles]) => {
      header &&
        (documentStyle[header] = {
          decorations: convertHeaderToInlineStyles(styles),
        });
    });
  return documentStyle;
};

export const fromDraft = (draftJSON: DraftContent, opts: FromDraftOptions = {}): RichContent => {
  const { blocks, entityMap, documentStyle, ID: id } = cloneDeep(draftJSON);
  const nodes: Node[] = [];

  const parseBlocks = (index = 0) => {
    const block = blocks[index];
    if (block) {
      switch (block.type) {
        case BlockType.Atomic:
          const atomicBlock = parseAtomicBlock(block);
          if (atomicBlock) {
            nodes.push(atomicBlock);
          }
          parseBlocks(index + 1);
          break;
        case BlockType.Blockquote:
          nodes.push(parseQuoteBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.CodeBlock:
          nodes.push(parseCodeBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.HeaderOne:
        case BlockType.HeaderTwo:
        case BlockType.HeaderThree:
        case BlockType.HeaderFour:
        case BlockType.HeaderFive:
        case BlockType.HeaderSix:
          nodes.push(parseHeadingBlock(block));
          parseBlocks(index + 1);
          break;
        case BlockType.OrderedListItem:
        case BlockType.UnorderedListItem:
          const { node, nextIndex } = parseListBlocks(index);
          nodes.push(node);
          parseBlocks(nextIndex);
          break;
        case BlockType.Unstyled:
          nodes.push(parseTextBlock(block));
          parseBlocks(index + 1);
          break;
        default:
          if (opts.ignoreUnsupportedValues) {
            parseBlocks(index + 1);
          } else {
            throw Error(`ERROR! Unknown block type "${block.type}"!`);
          }
      }
    }
  };

  const parseAtomicBlock = ({ key, data, entityRanges }: RicosContentBlock): Node | null => {
    if (entityRanges && entityRanges.length) {
      const entity = getEntity(entityRanges[0].key, entityMap);
      if (entity) {
        const nodes = nestedNodesConverters[entity.type]?.(entity) || [];
        return {
          id: key,
          nodes,
          style: getNodeStyle(data),
          ...entity,
        };
      }
    }
    return null;
  };

  const parseQuoteBlock = (block: RicosContentBlock): Node => ({
    id: block.key,
    type: Node_Type.BLOCKQUOTE,
    nodes: [parseTextBlock(block)],
    style: getNodeStyle(block.data),
  });

  const parseCodeBlock = (block: RicosContentBlock): Node => ({
    id: block.key,
    type: Node_Type.CODE_BLOCK,
    nodes: getTextNodes(block, entityMap, opts),
    style: getNodeStyle(block.data),
    codeBlockData: {
      textStyle: getTextStyle(block.data),
    },
  });

  const parseHeadingBlock = (block: RicosContentBlock): Node => {
    const getLevel = (blockType: string) => {
      if (Object.keys(HeaderLevel).includes(blockType)) {
        return HeaderLevel[blockType];
      }
      throw Error(`ERROR! Unknown header level "${blockType}"!`);
    };
    return {
      id: block.key,
      type: Node_Type.HEADING,
      headingData: {
        level: getLevel(block.type),
        indentation: block.depth || undefined,
        textStyle: getTextStyle(block.data),
      },
      nodes: getTextNodes(block, entityMap, opts),
      style: getNodeStyle(block.data),
    };
  };

  const parseTextBlock = (block: RicosContentBlock): Node => {
    const paragraphNode: Node = createParagraphNode(
      [],
      { textStyle: getTextStyle(block.data) },
      getNodeStyle(block.data)
    );

    switch (block.type) {
      case BlockType.Unstyled:
        paragraphNode.id = block.key;
      // falls through
      case BlockType.Blockquote:
      case BlockType.OrderedListItem:
      case BlockType.UnorderedListItem:
        if (paragraphNode.paragraphData) {
          paragraphNode.paragraphData.indentation = block.depth;
        }
        break;
      default:
    }

    const nodes = getTextNodes(block, entityMap, opts);

    if (!isEmpty(nodes)) {
      paragraphNode.nodes = nodes;
    }

    return paragraphNode;
  };

  const createListItem = (block: RicosContentBlock): Node => ({
    id: block.key,
    type: Node_Type.LIST_ITEM,
    nodes: [parseTextBlock(block)],
  });

  const isListBlock = (block: RicosContentBlock): boolean =>
    FROM_DRAFT_LIST_TYPE[block.type] !== undefined;

  const parseListBlocks = (listStartIndex: number): { node: Node; nextIndex: number } => {
    const { type: listType, depth } = blocks[listStartIndex];
    const listNodes: Node[] = [];
    let searchIndex = listStartIndex;
    let nextBlock = blocks[searchIndex];

    while (nextBlock && isListBlock(nextBlock) && nextBlock.depth >= depth) {
      if (nextBlock.depth > depth || nextBlock.type !== listType) {
        const { node, nextIndex } = parseListBlocks(searchIndex);
        listNodes[listNodes.length - 1].nodes.push(node);
        searchIndex = nextIndex;
      } else {
        listNodes.push(createListItem(nextBlock));
        searchIndex++;
      }
      nextBlock = blocks[searchIndex];
    }
    return {
      node: {
        id: generateId(),
        type: FROM_DRAFT_LIST_TYPE[listType],
        nodes: listNodes,
      },
      nextIndex: searchIndex,
    };
  };

  parseBlocks();

  const content: RichContent = {
    nodes,
    metadata: initializeMetadata({ id }),
    documentStyle: parseDocStyle(documentStyle),
  };

  return RichContent.fromJSON(content);
};
