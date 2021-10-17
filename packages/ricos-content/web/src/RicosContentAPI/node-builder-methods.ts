import {
  ButtonData,
  ButtonData_Type,
  CodeBlockData,
  DividerData,
  DividerData_Alignment,
  DividerData_LineStyle,
  DividerData_Width,
  HeadingData,
  HTMLData,
  MapData,
  MapType,
  Node,
  Node_Type,
  ParagraphData,
  PluginContainerData,
  PluginContainerData_Alignment,
  PluginContainerData_Width_Type,
  RichContent,
  TextData,
  TextStyle_TextAlignment,
} from 'ricos-schema';
import { dataByNodeType } from '../converters/nodeUtils';
import { ListItemData } from '../types/contentApi';
import { ListItemNode, ListNode, ParagraphNode, RichTextNode } from '../types/node-refined-types';
import { addNode as add, toListDataArray, toTextDataArray } from './builder-utils';

export type AddMethodParams<TData> = {
  data: TData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
  type: Node_Type;
};

export type AddTextMethodParams<T> = AddMethodParams<T> & {
  text?: string | TextData | (string | TextData)[];
  type: RichTextNode['type'];
};

export type AddListMethodParams = {
  items: string | TextData | ListItemData | (string | TextData | ListItemData)[];
  data?: ParagraphData;
  type: ListNode['type'];
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
};

export const DEFAULT_PARAGRAPH_DATA: ParagraphData = {
  textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
  indentation: 0,
};

export const DEFAULT_CONTAINER_DATA: PluginContainerData = {
  alignment: PluginContainerData_Alignment.CENTER,
  textWrap: true,
  width: { size: PluginContainerData_Width_Type.CONTENT },
};

export const DEFAULT_DIVIDER_DATA: DividerData = {
  lineStyle: DividerData_LineStyle.SINGLE,
  width: DividerData_Width.LARGE,
  alignment: DividerData_Alignment.CENTER,
  containerData: { ...DEFAULT_CONTAINER_DATA, textWrap: false },
};

export const DEFAULT_BUTTON_DATA: ButtonData = {
  type: ButtonData_Type.ACTION,
  containerData: DEFAULT_CONTAINER_DATA,
  text: 'Click Me',
};

export const DEFAULT_CODE_DATA: CodeBlockData = {
  textStyle: {
    textAlignment: TextStyle_TextAlignment.AUTO,
  },
};

export const DEFAULT_HEADING_DATA: HeadingData = {
  level: 2,
  indentation: 0,
  textStyle: { textAlignment: TextStyle_TextAlignment.AUTO },
};

export const DEFAULT_MAP_DATA: MapData = {
  containerData: DEFAULT_CONTAINER_DATA,
  mapSettings: {
    mapType: MapType.ROADMAP,
  },
};

export const DEFAULT_HTML_DATA: HTMLData = {
  containerData: DEFAULT_CONTAINER_DATA,
  html: '<div/>',
  url: undefined,
};

export const createNode = <T = Node, NT = Node[]>(generateId: () => string) => (
  type: Node_Type,
  data: unknown,
  nodes?: NT
): T => ({ id: generateId(), type, ...dataByNodeType(type, data), nodes: nodes || [] });

export const createListNode = <T extends ListNode>(generateId: () => string) => (
  type: ListNode['type'],
  items: ListItemData[]
): T =>
  createNode<T, ListItemNode[]>(generateId)(
    type,
    {},
    items.map(({ text, data }) =>
      createNode<ListItemNode, ParagraphNode[]>(generateId)(Node_Type.LIST_ITEM, {}, [
        createTextNode<ParagraphNode>(generateId)(Node_Type.PARAGRAPH, text, data),
      ])
    )
  );

export const createTextNode = <T extends RichTextNode>(generateId: () => string) => (
  type: RichTextNode['type'],
  text: TextData[],
  data: unknown
): T => ({
  ...createNode<T>(generateId)(type, data),
  nodes: text.map(textData => ({
    nodes: [],
    id: '',
    type: Node_Type.TEXT,
    ...dataByNodeType(Node_Type.TEXT, textData),
  })),
});

export const addNode = (generateId: () => string) => <TData>({
  data,
  type,
  index,
  before,
  after,
  content,
}: AddMethodParams<TData>): RichContent => {
  const node: Node = createNode(generateId)(type, data);
  return add({ node: node as Node, index, before, after, content });
};

export const addTextNode = (generateId: () => string) => <TData>({
  text,
  data,
  type,
  index,
  before,
  after,
  content,
}: AddTextMethodParams<TData>): RichContent => {
  const textData = toTextDataArray(text);
  const node = createTextNode(generateId)(type, textData, data);
  return add({ node: node as Node, index, before, after, content });
};

export const addListNode = (generateId: () => string) => ({
  items,
  data = DEFAULT_PARAGRAPH_DATA,
  type,
  index,
  before,
  after,
  content,
}: AddListMethodParams): RichContent => {
  const listItemData = toListDataArray(items, data);
  const node = createListNode(generateId)(type, listItemData);
  return add({ node: node as Node, index, before, after, content });
};
