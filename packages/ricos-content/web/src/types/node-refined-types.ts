import type {
  AppEmbedData,
  ButtonData,
  CodeBlockData,
  CollapsibleListData,
  DividerData,
  EmbedData,
  FileData,
  GalleryData,
  GIFData,
  HeadingData,
  HTMLData,
  LinkPreviewData,
  MapData,
  Node,
  Node_Type,
  ParagraphData,
  RichContent,
  TableCellData,
  TableData,
  TextData,
  VideoData,
  AudioData,
} from 'ricos-schema';

type Identified = {
  id: Node['id'];
};

// RichText
export type RichText = {
  nodes: RichTextNode[];
  metadata?: RichContent['metadata'];
};

export type RichTextNode = ParagraphNode | HeadingNode | CodeBlockNode | BlockquoteNode;

type TextNodeContainer = Identified & {
  nodes: TextNode[];
};

export type TextNode = Leaf & {
  textData: TextData;
  type: Node_Type.TEXT;
  id: '';
};

export type ParagraphNode = TextNodeContainer & {
  paragraphData: ParagraphData;
  type: Node_Type.PARAGRAPH;
};

export type HeadingNode = TextNodeContainer & {
  headingData: HeadingData;
  type: Node_Type.HEADING;
};

export type CodeBlockNode = TextNodeContainer & {
  codeBlockData: CodeBlockData;
  type: Node_Type.CODE_BLOCK;
};

export type BlockquoteNode = TextNodeContainer & {
  type: Node_Type.BLOCKQUOTE;
};

// Lists
export type ListItemNode = Identified & {
  type: Node_Type.LIST_ITEM;
  nodes: ParagraphNode[]; // until editor is based on draft
};

export type ListNode = Identified & {
  type: Node_Type.ORDERED_LIST | Node_Type.BULLETED_LIST;
  nodes: ListItemNode[];
};

// Top-level nodes
export type RichContentNode =
  | RichTextNode
  | ListNode
  | CollapsibleListNode
  | TableNode
  | AppEmbedNode
  | ButtonNode
  | DividerNode
  | EmbedNode
  | FileNode
  | GalleryNode
  | GifNode
  | HtmlNode
  | ImageNode
  | LinkPreviewNode
  | MapNode
  | VideoNode
  | AudioNode;

// RichContent Containers
type RichContainer = {
  nodes: RichContentNode[];
};

export type CollapsibleListNode = Identified & {
  type: Node_Type.COLLAPSIBLE_LIST;
  nodes: CollapsibleItemNode[];
  data: CollapsibleListData;
};

export type CollapsibleItemNode = Identified & {
  type: Node_Type.COLLAPSIBLE_ITEM;
  nodes: [CollapsibleItemTitleNode, CollapsibleItemBodyNode];
};

export type CollapsibleItemTitleNode = Identified & {
  type: Node_Type.COLLAPSIBLE_ITEM_TITLE;
  nodes: RichTextNode[];
};

export type CollapsibleItemBodyNode = Identified &
  RichContainer & {
    type: Node_Type.COLLAPSIBLE_ITEM_BODY;
  };

// Table
export type TableNode = Identified & {
  type: Node_Type.TABLE;
  nodes: TableRowNode[];
  tableData: TableData;
};

export type TableRowNode = Identified & {
  type: Node_Type.TABLE_ROW;
  nodes: TableCellNode[];
};

export type TableCellNode = Identified &
  RichContainer & {
    type: Node_Type.TABLE_CELL;
    tableCellData: TableCellData;
  };

// Atomic
type Leaf = {
  nodes: [];
};

export type DividerNode = Identified &
  Leaf & {
    type: Node_Type.DIVIDER;
    dividerData: DividerData;
  };

export type ButtonNode = Identified &
  Leaf & {
    type: Node_Type.BUTTON;
    buttonData: ButtonData;
  };

export type FileNode = Identified &
  Leaf & {
    type: Node_Type.FILE;
    fileData: FileData;
  };

export type GalleryNode = Identified &
  Leaf & {
    type: Node_Type.GALLERY;
    galleryData: GalleryData;
  };

export type GifNode = Identified &
  Leaf & {
    type: Node_Type.GIF;
    gifData: GIFData;
  };

export type HtmlNode = Identified &
  Leaf & {
    type: Node_Type.HTML;
    htmlData: HTMLData;
  };

export type ImageNode = Identified &
  Leaf & {
    type: Node_Type.IMAGE;
    imageData: ImageData;
  };

export type LinkPreviewNode = Identified &
  Leaf & {
    type: Node_Type.LINK_PREVIEW;
    linkPreviewData: LinkPreviewData;
  };

export type MapNode = Identified &
  Leaf & {
    type: Node_Type.MAP;
    mapData: MapData;
  };

export type AppEmbedNode = Identified &
  Leaf & {
    type: Node_Type.APP_EMBED;
    appEmbedData: AppEmbedData;
  };

export type EmbedNode = Identified &
  Leaf & {
    type: Node_Type.EMBED;
    embedData: EmbedData;
  };

export type VideoNode = Identified &
  Leaf & {
    type: Node_Type.VIDEO;
    videoData: VideoData;
  };

export type AudioNode = Identified &
  Leaf & {
    type: Node_Type.AUDIO;
    AudioData: AudioData;
  };
