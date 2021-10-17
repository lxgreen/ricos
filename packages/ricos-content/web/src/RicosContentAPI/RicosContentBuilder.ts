import {
  AppEmbedData,
  CodeBlockData,
  FileData,
  GalleryData,
  HeadingData,
  ImageData,
  LinkPreviewData,
  Node_Type,
  ParagraphData,
  RichContent,
  VideoData,
  GIFData,
  EmbedData,
} from 'ricos-schema';
import { ContentBuilder } from '../types';
import { ListNode, RichTextNode } from '../types/node-refined-types';
import { addCollapsibleList } from './collapsible-list-builder-api';
import {
  AddListMethodParams,
  addListNode,
  AddMethodParams,
  addNode,
  AddTextMethodParams,
  addTextNode,
  DEFAULT_DIVIDER_DATA,
  DEFAULT_PARAGRAPH_DATA,
  DEFAULT_HTML_DATA,
  DEFAULT_BUTTON_DATA,
  DEFAULT_CODE_DATA,
  DEFAULT_HEADING_DATA,
  DEFAULT_MAP_DATA,
} from './node-builder-methods';
import { addTable } from './table-builder-api';

export interface RicosBuilder extends ContentBuilder {
  new (): ContentBuilder;
}

export const setupContentBuilder = (
  generateId: () => string
): ContentBuilder & { RicosContentBuilder: RicosBuilder } => {
  class RicosContentBuilder {}

  const builderApis = {};

  [
    {
      name: 'addParagraph',
      type: Node_Type.PARAGRAPH,
      dataT: DEFAULT_PARAGRAPH_DATA,
    },
    { name: 'addHeading', type: Node_Type.HEADING, dataT: DEFAULT_HEADING_DATA },
    { name: 'addCode', type: Node_Type.CODE_BLOCK, dataT: DEFAULT_CODE_DATA },
  ].forEach(
    ({
      name,
      type,
      dataT,
    }: {
      name: string;
      type: RichTextNode['type'];
      dataT: ParagraphData | CodeBlockData | HeadingData;
    }) => {
      builderApis[name] = RicosContentBuilder.prototype[name] = function({
        data = dataT,
        text,
        index,
        before,
        after,
        content,
      }: AddTextMethodParams<typeof dataT>): RichContent {
        return addTextNode(generateId)({
          text,
          type,
          data,
          content,
          index,
          before,
          after,
        });
      };
    }
  );

  [
    { name: 'addBulletList', type: Node_Type.BULLETED_LIST },
    { name: 'addOrderedList', type: Node_Type.ORDERED_LIST },
  ].forEach(({ name, type }: { name: string; type: ListNode['type'] }) => {
    builderApis[name] = RicosContentBuilder.prototype[name] = function({
      items,
      data,
      index,
      before,
      after,
      content,
    }: AddListMethodParams): RichContent {
      return addListNode(generateId)({ items, data, type, index, before, after, content });
    };
  });

  [
    { name: 'addDivider', type: Node_Type.DIVIDER, dataT: DEFAULT_DIVIDER_DATA },
    { name: 'addFile', type: Node_Type.FILE, dataT: {} as FileData },
    { name: 'addGallery', type: Node_Type.GALLERY, dataT: {} as GalleryData },
    { name: 'addHtml', type: Node_Type.HTML, dataT: DEFAULT_HTML_DATA },
    { name: 'addImage', type: Node_Type.IMAGE, dataT: {} as ImageData },
    { name: 'addVideo', type: Node_Type.VIDEO, dataT: {} as VideoData },
    { name: 'addAppEmbed', type: Node_Type.APP_EMBED, dataT: {} as AppEmbedData },
    { name: 'addEmbed', type: Node_Type.EMBED, dataT: {} as EmbedData },
    { name: 'addLinkPreview', type: Node_Type.LINK_PREVIEW, dataT: {} as LinkPreviewData },
    { name: 'addButton', type: Node_Type.BUTTON, dataT: DEFAULT_BUTTON_DATA },
    { name: 'addGif', type: Node_Type.GIF, dataT: {} as GIFData },
    { name: 'addMap', type: Node_Type.MAP, dataT: DEFAULT_MAP_DATA },
  ].forEach(({ name, type, dataT }) => {
    builderApis[name] = RicosContentBuilder.prototype[name] = function({
      data = dataT,
      index,
      before,
      after,
      content,
    }: AddMethodParams<typeof dataT>): RichContent {
      return addNode(generateId)({
        type,
        data,
        content,
        index,
        before,
        after,
      });
    };
  });

  Object.entries({ addTable, addCollapsibleList }).forEach(
    ([name, method]) =>
      (builderApis[name] = RicosContentBuilder.prototype[name] = method(generateId))
  );

  return {
    RicosContentBuilder: (RicosContentBuilder as unknown) as RicosBuilder,
    ...(builderApis as ContentBuilder),
  };
};
