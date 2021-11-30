import { Decoration, Node } from 'ricos-schema';
import { RicosInlineStyleRange, RicosEntityRange, RicosEntityMap } from '../../../types';
export interface DraftTypedDecoration extends Omit<Decoration, 'type'> {
    type: string;
    emojiData?: {
        emojiUnicode: string;
    };
}
export interface RangedDecoration extends DraftTypedDecoration {
    start: number;
    end: number;
}
interface RangedDecorationMap {
    [type: string]: RangedDecoration[];
}
export declare const mergeTextNodes: (nodes: Node[]) => {
    text: string;
    decorationMap: RangedDecorationMap;
};
export declare const parseDecorations: (decorationMap: RangedDecorationMap, text: string) => {
    inlineStyleDecorations: RangedDecoration[];
    entityDecorations: RangedDecoration[];
};
export declare const parseInlineStyleDecorations: (decorations: RangedDecoration[]) => RicosInlineStyleRange[];
export declare const parseEntityDecorations: (decorations: RangedDecoration[], latestEntityKey: number) => {
    entityRanges: RicosEntityRange[];
    entityMap: RicosEntityMap;
    latestEntityKey: number;
};
export declare const getParagraphNode: (node: Node) => Node;
export declare const convertDocumentStyleDecorationTypes: (decorations: Decoration[]) => {};
export {};
//# sourceMappingURL=decorationParsers.d.ts.map