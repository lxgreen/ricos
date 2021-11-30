import { Node, Decoration, Decoration_Type } from 'ricos-schema';
import { TextNode, Element, CommentNode } from 'parse5';
export declare type ContentNode = Element | TextNode | CommentNode;
export declare type Context = {
    readonly decorations: Decoration[];
    visit: (element: Element) => Node[];
    addDecoration: (type: Decoration_Type, data: Omit<Decoration, 'type'>, element: Element) => Node[];
};
export declare type Rule = [(contentNode: ContentNode) => boolean, (context: Context) => (contentNode: ContentNode) => Node[]];
//# sourceMappingURL=models.d.ts.map