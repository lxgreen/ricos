import { Overwrite } from 'utility-types';
import { Node, RichContent } from 'ricos-schema';
import { RawDraftInlineStyleRange, RawDraftContentBlock, RawDraftEntity, RawDraftContentState, RawDraftEntityRange } from 'draft-js';
export interface TextBlockStyle {
    'font-size'?: number;
    color?: string;
    'background-color'?: string;
    'font-weight'?: string;
    'font-style'?: string;
    'text-decoration'?: string;
}
export interface DocumentStyle {
    headerOne?: TextBlockStyle;
    headerTwo?: TextBlockStyle;
    headerThree?: TextBlockStyle;
    headerFour?: TextBlockStyle;
    headerFive?: TextBlockStyle;
    headerSix?: TextBlockStyle;
    paragraph?: TextBlockStyle;
}
export declare type RicosInlineStyleRange = Overwrite<RawDraftInlineStyleRange, {
    style: string;
}>;
export declare type RicosEntityRange = Overwrite<RawDraftEntityRange, {
    key: string | number;
}>;
export declare type RicosContentBlock = Overwrite<RawDraftContentBlock, {
    inlineStyleRanges: RicosInlineStyleRange[];
    entityRanges: RicosEntityRange[];
}>;
export declare type RicosEntity = Overwrite<RawDraftEntity, {
    mutability: string;
}>;
export declare type RicosEntityMap = {
    [key: string]: RicosEntity;
};
export interface RicosContent extends Overwrite<RawDraftContentState, {
    blocks: RicosContentBlock[];
    entityMap: RicosEntityMap;
}> {
    documentStyle?: DocumentStyle;
    VERSION?: string;
    ID?: string;
}
export interface DraftContent extends RicosContent {
}
declare type RawNode = Overwrite<Node, {
    type: string;
    nodes: RawNode[];
}>;
export declare type RawRichContent = Overwrite<RichContent, {
    nodes: RawNode[];
}>;
export declare function isDraftContent(content: any): content is DraftContent;
export declare function isRichContent(content: any): content is RichContent;
export {};
//# sourceMappingURL=contentTypes.d.ts.map