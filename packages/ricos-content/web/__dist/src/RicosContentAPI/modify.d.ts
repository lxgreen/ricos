import { Node, RichContent } from 'ricos-schema';
export declare type RichContentModifier = {
    filter: (predicate: (node: Node) => boolean) => RichContentModifier;
    set: (setter: (node: Node) => Node | Node[]) => RichContent;
};
export declare const modify: (content: RichContent) => RichContentModifier;
//# sourceMappingURL=modify.d.ts.map