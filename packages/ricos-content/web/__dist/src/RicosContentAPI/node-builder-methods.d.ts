import { ButtonData, CodeBlockData, DividerData, HeadingData, HTMLData, MapData, Node, Node_Type, ParagraphData, PluginContainerData, RichContent, TextData, PollData } from 'ricos-schema';
import { ListItemData } from '../types/contentApi';
import { ListNode, RichTextNode } from '../types/node-refined-types';
export declare type AddMethodParams<TData> = {
    data: TData;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
    type: Node_Type;
};
export declare type AddTextMethodParams<T> = AddMethodParams<T> & {
    text?: string | TextData | (string | TextData)[];
    type: RichTextNode['type'];
};
export declare type AddListMethodParams = {
    items: string | TextData | ListItemData | (string | TextData | ListItemData)[];
    data?: ParagraphData;
    type: ListNode['type'];
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
};
export declare const DEFAULT_PARAGRAPH_DATA: ParagraphData;
export declare const DEFAULT_CONTAINER_DATA: PluginContainerData;
export declare const DEFAULT_DIVIDER_DATA: DividerData;
export declare const DEFAULT_BUTTON_DATA: ButtonData;
export declare const DEFAULT_CODE_DATA: CodeBlockData;
export declare const DEFAULT_HEADING_DATA: HeadingData;
export declare const DEFAULT_MAP_DATA: MapData;
export declare const DEFAULT_HTML_DATA: HTMLData;
export declare const DEFAULT_POLL_DATA: PollData;
export declare const createNode: <T = Node, NT = Node[]>(generateId: () => string) => (type: Node_Type, data: unknown, nodes?: NT | undefined) => T;
export declare const createListNode: <T extends ListNode>(generateId: () => string) => (type: ListNode['type'], items: ListItemData[]) => T;
export declare const createTextNode: <T extends RichTextNode>(generateId: () => string) => (type: RichTextNode['type'], text: TextData[], data: unknown) => T;
export declare const addNode: (generateId: () => string) => <TData>({ data, type, index, before, after, content, }: AddMethodParams<TData>) => RichContent;
export declare const addTextNode: (generateId: () => string) => <TData>({ text, data, type, index, before, after, content, }: AddTextMethodParams<TData>) => RichContent;
export declare const addListNode: (generateId: () => string) => ({ items, data, type, index, before, after, content, }: AddListMethodParams) => RichContent;
//# sourceMappingURL=node-builder-methods.d.ts.map