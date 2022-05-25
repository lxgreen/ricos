/* eslint-disable no-console, fp/no-loops, no-case-declarations */
import { cloneDeep, isEmpty } from 'lodash';
import type { DraftContent, RicosContentBlock, DocumentStyle } from '../../../types';
import { BlockType, FROM_DRAFT_LIST_TYPE, HeaderLevel } from '../consts';
import type { Node, DocumentStyle as RicosDocumentStyle } from 'ricos-schema';
import { RichContent, Node_Type, Decoration_Type } from 'ricos-schema';
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
    const [value, unit] = style.split(/(px|em)/gi);
    return {
      type: Decoration_Type.FONT_SIZE,
      fontSizeData: { unit: unit.toUpperCase(), value: parseInt(value) },
    };
  },
};

const convertHeaderToRicosDecorations = styles =>
  Object.entries(styles)
    .filter(([key, _]) => cssToRicosDecoration[key])
    .map(([key, style]) => cssToRicosDecoration[key](style));

const convertCssToNodeStyle = styles => {
  return styles['padding-top'] || styles['padding-bottom']
    ? {
        paddingTop: styles['padding-top'],
        paddingBottom: styles['padding-bottom'],
      }
    : undefined;
};

const parseDocStyle = (documentStyle?: DocumentStyle): RicosDocumentStyle | undefined => {
  if (documentStyle) {
    const ricosDoucmentStyle: RicosDocumentStyle = {};
    Object.entries(documentStyle).forEach(([header, styles]) => {
      if (header) {
        const decorations = convertHeaderToRicosDecorations(styles);
        const nodeStyle = convertCssToNodeStyle(styles);
        const lineHeight = styles['line-height'];
        ricosDoucmentStyle[header] = {};
        decorations?.length > 0 && (ricosDoucmentStyle[header].decorations = decorations);
        nodeStyle && (ricosDoucmentStyle[header].nodeStyle = nodeStyle);
        lineHeight && (ricosDoucmentStyle[header].lineHeight = lineHeight);
      }
    });
    return ricosDoucmentStyle;
  }
};

const normalizeBlock = block => {
  block.depth = block.depth || 0;
  block.entityRanges = block.entityRanges || [];
  block.inlineStyleRanges = block.inlineStyleRanges || [];
};

export const fromDraft = (draftJSON: DraftContent, opts: FromDraftOptions = {}): RichContent => {
  const { blocks, entityMap, documentStyle, ID: id } = cloneDeep(draftJSON);
  const nodes: Node[] = [];
  const contentIdPrefix = Math.random().toString(36).substr(2, 9);
  const withDepth = (block: RicosContentBlock, depth = 0) => ({ ...block, depth });

  const parseBlock = index => {
    const block = blocks[index];
    if (!block) {
      return -1;
    }

    normalizeBlock(block);

    switch (block.type) {
      case BlockType.Atomic:
        const atomicBlock = parseAtomicBlock(block);
        if (atomicBlock) {
          nodes.push(atomicBlock);
        }
        return index + 1;
      case BlockType.Blockquote:
        nodes.push(parseQuoteBlock(block));
        return index + 1;
      case BlockType.CodeBlock:
        nodes.push(parseCodeBlock(block));
        return index + 1;
      case BlockType.HeaderOne:
      case BlockType.HeaderTwo:
      case BlockType.HeaderThree:
      case BlockType.HeaderFour:
      case BlockType.HeaderFive:
      case BlockType.HeaderSix:
        nodes.push(parseHeadingBlock(block));
        return index + 1;
      case BlockType.OrderedListItem:
      case BlockType.UnorderedListItem:
        const { node, nextIndex } = parseListBlocks(index);
        nodes.push(node);
        return nextIndex;
      case BlockType.Unstyled:
        nodes.push(parseTextBlock(block));
        return index + 1;
      default:
        if (opts.ignoreUnsupportedValues) {
          return index + 1;
        } else {
          throw Error(`ERROR! Unknown block type "${block.type}"!`);
        }
    }
  };

  const parseAtomicBlock = ({ key, data, entityRanges }: RicosContentBlock): Node | null => {
    if (entityRanges && entityRanges.length) {
      const entity = getEntity(entityRanges[0].key, entityMap);
      if (entity) {
        const nodes = nestedNodesConverters[entity.type]?.(entity, opts) || [];
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
    nodes: [parseTextBlock(withDepth(block))],
    style: getNodeStyle(block.data),
    blockquoteData: { indentation: block.depth },
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
        indentation: block.depth,
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
    nodes: [parseTextBlock(withDepth(block))],
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

    const listData =
      FROM_DRAFT_LIST_TYPE[listType] === Node_Type.ORDERED_LIST
        ? 'orderedListData'
        : 'bulletedListData';

    return {
      node: {
        id: generateId(contentIdPrefix),
        type: FROM_DRAFT_LIST_TYPE[listType],
        nodes: listNodes,
        [listData]: { indentation: depth },
      },
      nextIndex: searchIndex,
    };
  };

  let i = 0;
  while (i !== -1) {
    i = parseBlock(i);
  }

  const content: RichContent = {
    nodes,
    metadata: initializeMetadata({ id }),
    documentStyle: parseDocStyle(documentStyle),
  };

  return RichContent.fromJSON(content);
};
