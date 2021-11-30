import { AppEmbedData, ButtonData, CodeBlockData, CollapsibleListData, DividerData, EmbedData, FileData, GalleryData, GIFData, HeadingData, HTMLData, LinkPreviewData, MapData, Node, Node_Type, ParagraphData, RichContent, TableCellData, TableData, TextData, VideoData } from 'ricos-schema';
declare type Identified = {
    id: Node['id'];
};
export declare type RichText = {
    nodes: RichTextNode[];
    metadata?: RichContent['metadata'];
};
export declare type RichTextNode = ParagraphNode | HeadingNode | CodeBlockNode | BlockquoteNode;
declare type TextNodeContainer = Identified & {
    nodes: TextNode[];
};
export declare type TextNode = Leaf & {
    textData: TextData;
    type: Node_Type.TEXT;
    id: '';
};
export declare type ParagraphNode = TextNodeContainer & {
    paragraphData: ParagraphData;
    type: Node_Type.PARAGRAPH;
};
export declare type HeadingNode = TextNodeContainer & {
    headingData: HeadingData;
    type: Node_Type.HEADING;
};
export declare type CodeBlockNode = TextNodeContainer & {
    codeBlockData: CodeBlockData;
    type: Node_Type.CODE_BLOCK;
};
export declare type BlockquoteNode = TextNodeContainer & {
    type: Node_Type.BLOCKQUOTE;
};
export declare type ListItemNode = Identified & {
    type: Node_Type.LIST_ITEM;
    nodes: ParagraphNode[];
};
export declare type ListNode = Identified & {
    type: Node_Type.ORDERED_LIST | Node_Type.BULLETED_LIST;
    nodes: ListItemNode[];
};
export declare type RichContentNode = RichTextNode | ListNode | CollapsibleListNode | TableNode | AppEmbedNode | ButtonNode | DividerNode | EmbedNode | FileNode | GalleryNode | GifNode | HtmlNode | ImageNode | LinkPreviewNode | MapNode | VideoNode;
declare type RichContainer = {
    nodes: RichContentNode[];
};
export declare type CollapsibleListNode = Identified & {
    type: Node_Type.COLLAPSIBLE_LIST;
    nodes: CollapsibleItemNode[];
    data: CollapsibleListData;
};
export declare type CollapsibleItemNode = Identified & {
    type: Node_Type.COLLAPSIBLE_ITEM;
    nodes: [CollapsibleItemTitleNode, CollapsibleItemBodyNode];
};
export declare type CollapsibleItemTitleNode = Identified & {
    type: Node_Type.COLLAPSIBLE_ITEM_TITLE;
    nodes: RichTextNode[];
};
export declare type CollapsibleItemBodyNode = Identified & RichContainer & {
    type: Node_Type.COLLAPSIBLE_ITEM_BODY;
};
export declare type TableNode = Identified & {
    type: Node_Type.TABLE;
    nodes: TableRowNode[];
    tableData: TableData;
};
export declare type TableRowNode = Identified & {
    type: Node_Type.TABLE_ROW;
    nodes: TableCellNode[];
};
export declare type TableCellNode = Identified & RichContainer & {
    type: Node_Type.TABLE_CELL;
    tableCellData: TableCellData;
};
declare type Leaf = {
    nodes: [];
};
export declare type DividerNode = Identified & Leaf & {
    type: Node_Type.DIVIDER;
    dividerData: DividerData;
};
export declare type ButtonNode = Identified & Leaf & {
    type: Node_Type.BUTTON;
    buttonData: ButtonData;
};
export declare type FileNode = Identified & Leaf & {
    type: Node_Type.FILE;
    fileData: FileData;
};
export declare type GalleryNode = Identified & Leaf & {
    type: Node_Type.GALLERY;
    galleryData: GalleryData;
};
export declare type GifNode = Identified & Leaf & {
    type: Node_Type.GIF;
    gifData: GIFData;
};
export declare type HtmlNode = Identified & Leaf & {
    type: Node_Type.HTML;
    htmlData: HTMLData;
};
export declare type ImageNode = Identified & Leaf & {
    type: Node_Type.IMAGE;
    imageData: ImageData;
};
export declare type LinkPreviewNode = Identified & Leaf & {
    type: Node_Type.LINK_PREVIEW;
    linkPreviewData: LinkPreviewData;
};
export declare type MapNode = Identified & Leaf & {
    type: Node_Type.MAP;
    mapData: MapData;
};
export declare type AppEmbedNode = Identified & Leaf & {
    type: Node_Type.APP_EMBED;
    appEmbedData: AppEmbedData;
};
export declare type EmbedNode = Identified & Leaf & {
    type: Node_Type.EMBED;
    embedData: EmbedData;
};
export declare type VideoNode = Identified & Leaf & {
    type: Node_Type.VIDEO;
    videoData: VideoData;
};
export {};
//# sourceMappingURL=node-refined-types.d.ts.map