import * as O from 'fp-ts/Option';
import * as RONEA from 'fp-ts/ReadonlyNonEmptyArray';
import { ChildNode, DocumentFragment, Document, Node, Element, TextNode, CommentNode, Attribute } from 'parse5';
import { ContentNode } from './models';
export declare type AstContext = {
    visit: (node: Element | DocumentFragment) => ContentNode;
};
export declare type AstRule = [(node: ContentNode) => boolean, (node: ContentNode) => ContentNode];
export declare const isText: (node: Node) => node is TextNode;
export declare const isComment: (node: Node) => node is CommentNode;
export declare const isLeaf: (node: Node) => boolean;
export declare const isWhitespace: (n: TextNode) => boolean;
export declare const hasDescendant: (predicate: (child: Node) => boolean) => (node: Node) => boolean;
export declare const getAttributes: (el: Element) => Record<string, string>;
export declare const getChildNodes: (element: Element | DocumentFragment) => ContentNode[];
export declare const appendChild: (element: Element, node: ContentNode) => void;
export declare const setParent: (parent: ContentNode) => (child: ContentNode) => {
    parentNode: ContentNode;
    nodeName: string;
    tagName: string;
    namespaceURI: string;
    attrs: Attribute[];
    sourceCodeLocation?: import("parse5").ElementLocation | undefined;
    childNodes: ContentNode[];
} | {
    parentNode: ContentNode;
    nodeName: "#text";
    value: string;
    sourceCodeLocation?: import("parse5").Location | undefined;
} | {
    parentNode: ContentNode;
    nodeName: "#comment";
    data: string;
    sourceCodeLocation?: import("parse5").Location | undefined;
};
export declare const isRoot: (node: Node) => node is DocumentFragment;
export declare const toDocumentFragment: (nodes: ChildNode[]) => DocumentFragment;
export declare const toName: (node: ContentNode) => string;
export declare const hasParent: (predicate: (node: ContentNode | Document | DocumentFragment) => boolean) => (node: ContentNode) => boolean;
export declare const hasTag: (tag: string) => (node: ContentNode) => boolean;
export declare const getStyle: (el: Element) => O.Option<{
    [x: string]: string;
}>;
export declare const hasStyleFor: (styleRule: string) => (el: Element) => boolean;
export declare const hasStyleRule: (style: Record<string, string>) => (el: Element) => boolean;
export declare const getClassNames: (el: Element) => RONEA.ReadonlyNonEmptyArray<string>;
export declare const hasClass: (predicate: (className: string) => boolean) => (el: Element) => boolean;
export declare const hasChild: (predicate: (node: ContentNode) => boolean) => (element: Element | DocumentFragment) => boolean;
export declare const oneOf: (tags: string[]) => (node: ContentNode) => boolean;
export declare const toAst: (html: string) => DocumentFragment;
//# sourceMappingURL=parse5-utils.d.ts.map