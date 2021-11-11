import {
  AppEmbedData,
  EmbedData,
  ButtonData,
  CodeBlockData,
  DividerData,
  FileData,
  GalleryData,
  GIFData,
  HeadingData,
  HTMLData,
  ImageData,
  LinkPreviewData,
  MapData,
  ParagraphData,
  RichContent,
  TableData,
  TextData,
  VideoData,
  TableCellData,
  CollapsibleListData,
  PollData,
} from 'ricos-schema';
import { RichText } from './node-refined-types';

export type PartialDeep<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? PartialDeep<U>[]
    : T[P] extends Record<string, unknown>
    ? PartialDeep<T[P]>
    : T[P];
};

type AddListMethod = ({
  items,
  data,
  index,
  before,
  after,
  content,
}: {
  items: string | TextData | ListItemData | (string | TextData | ListItemData)[];
  data?: ParagraphData;
  index?: number;
  before?: string;
  after?: string;
  content: RichContent;
}) => RichContent;

type AddLists = {
  addOrderedList: AddListMethod;
  addBulletList: AddListMethod;
};

type AddMethod<T> = {
  [P in keyof T]: ({
    data,
    index,
    before,
    after,
    content,
  }: {
    data?: Partial<T[P]>;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }) => RichContent;
};

type AddTextMethod<T> = {
  [P in keyof T]: ({
    text,
    data,
    index,
    before,
    after,
    content,
  }: {
    text?: string | TextData | (string | TextData)[];
    data?: Partial<T[P]>;
    index?: number;
    before?: string;
    after?: string;
    content: RichContent;
  }) => RichContent;
};

type AddMap = {
  addButton: ButtonData;
  addDivider: DividerData;
  addFile: FileData;
  addGallery: GalleryData;
  addGif: GIFData;
  addMap: MapData;
  addHtml: HTMLData;
  addImage: ImageData;
  addVideo: VideoData;
  addAppEmbed: AppEmbedData;
  addEmbed: EmbedData;
  addLinkPreview: LinkPreviewData;
  addPoll: PollData;
};

type AddTextMap = {
  addCode: CodeBlockData;
  addHeading: HeadingData;
  addParagraph: ParagraphData;
};

export type ListItemData = {
  text: TextData[];
  data: ParagraphData;
};

export type TableCell = {
  data?: TableCellData;
  content: RichContent;
};

export type CollapsibleListItem = {
  title: RichText;
  content: RichContent;
};

type ContentBuilderType = AddMethod<AddMap> &
  AddTextMethod<AddTextMap> &
  AddLists & {
    addTable: ({
      cells,
      data,
      index,
      before,
      after,
      content,
    }: {
      cells: TableCell[][];
      data?: TableData;
      index?: number;
      before?: string;
      after?: string;
      content: RichContent;
    }) => RichContent;
  } & {
    addCollapsibleList: ({
      items,
      data,
      index,
      before,
      after,
      content,
    }: {
      items: CollapsibleListItem[];
      data?: CollapsibleListData;
      index?: number;
      before?: string;
      after?: string;
      content: RichContent;
    }) => RichContent;
  };

export interface ContentBuilder extends ContentBuilderType {}
