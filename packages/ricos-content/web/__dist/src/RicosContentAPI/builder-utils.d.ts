import { ParagraphData, RichContent, TextData, Node } from 'ricos-schema';
import { ListItemData } from '../types';
export declare function addNode({ node, index, before, after, content, }: {
    node: Node;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
}): RichContent;
export declare const toListDataArray: (items: string | TextData | ListItemData | (string | TextData | ListItemData)[], data: ParagraphData) => ListItemData[];
export declare const toTextDataArray: (text?: string | TextData | (string | TextData)[] | undefined) => TextData[];
//# sourceMappingURL=builder-utils.d.ts.map