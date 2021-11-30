import { Node_Type, NodeStyle, ParagraphData, Node, Decoration, Metadata, Decoration_Type, HeadingData, Link } from 'ricos-schema';
export declare const createNode: <TData>(type: Node_Type, { nodes, data, style, id, }: {
    nodes: Node[];
    data: TData;
    style?: NodeStyle | undefined;
    id?: string | undefined;
}) => Node;
export declare const dataByNodeType: (type: Node_Type, data: unknown) => any;
export declare const createParagraphNode: (nodes?: Node[], data?: ParagraphData | undefined, style?: NodeStyle | undefined) => Node;
export declare const createTextNode: (text: string, decorations?: Decoration[]) => Node;
export declare const createHeadingNode: (nodes: Node[] | undefined, data: HeadingData) => Node;
export declare const createDecoration: (type: Decoration_Type, data?: Omit<Decoration, 'type'>) => Decoration;
export declare const initializeMetadata: ({ version, id, createdTimestamp, updatedTimestamp, }?: {
    version?: number | undefined;
    id?: string | undefined;
    createdTimestamp?: Date | undefined;
    updatedTimestamp?: Date | undefined;
}) => Metadata;
export declare const reduceDecorations: (decorations: Decoration[]) => Decoration[];
export declare const toLinkTarget: (target?: string) => string;
export declare const createLink: ({ url, rel, target, anchor, }: {
    url?: string | undefined;
    rel?: string | undefined;
    target?: string | undefined;
    anchor?: string | undefined;
}) => Link;
export declare const parseLink: ({ url, rel, target, anchor, customData, }: Link) => {
    url?: string | undefined;
    rel?: string | undefined;
    target?: string | undefined;
    anchor?: string | undefined;
    customData?: string | undefined;
};
export declare const createLinkDecoration: (data: {
    url?: string;
    rel?: string;
    target?: string;
}) => Decoration;
export declare const last: (arr: any) => any;
export declare const partitionBy: <T>(isSeparator: (node: T) => boolean, isPartition: (node: T) => boolean, Separator: (node: T) => T, Partition: (node: T) => T, addToPartition: (partition: T, node: T) => void) => (nodes: T[]) => T[];
//# sourceMappingURL=nodeUtils.d.ts.map