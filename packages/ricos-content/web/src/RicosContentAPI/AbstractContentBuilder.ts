import { identity } from 'lodash';
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
  VideoData,
  GIFData,
  EmbedData,
} from 'ricos-schema';
import { ContentBuilder } from '../types';
import { ListNode, RichTextNode } from '../types/node-refined-types';
import {
  DEFAULT_DIVIDER_DATA,
  DEFAULT_PARAGRAPH_DATA,
  DEFAULT_HTML_DATA,
  DEFAULT_BUTTON_DATA,
  DEFAULT_CODE_DATA,
  DEFAULT_HEADING_DATA,
  DEFAULT_MAP_DATA,
  DEFAULT_POLL_DATA,
} from './node-builder-methods';

export interface RicosBuilder extends ContentBuilder {
  new (): ContentBuilder;
}

type Creator<RT> = (generateId: () => string) => (data: unknown) => RT;

export const setupAbstractContentBuilder = <RT>(
  generateId: () => string,
  textNodeCreator: Creator<RT>,
  listNodeCreator: Creator<RT>,
  nodeCreator: Creator<RT>,
  tableNodeCreator: Creator<RT>,
  collapsibleListNodeCreator: Creator<RT>,
  methodPrefix: (name: string) => string = identity
): { [key: string]: (data: unknown) => RT } => {
  class RicosContentBuilder {}

  const builderApis: { [key: string]: (data: unknown) => RT } = {};

  [
    {
      name: methodPrefix('paragraph'),
      type: Node_Type.PARAGRAPH,
      dataT: DEFAULT_PARAGRAPH_DATA,
    },
    { name: methodPrefix('heading'), type: Node_Type.HEADING, dataT: DEFAULT_HEADING_DATA },
    { name: methodPrefix('code'), type: Node_Type.CODE_BLOCK, dataT: DEFAULT_CODE_DATA },
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
        ...rest
      }): RT {
        return textNodeCreator(generateId)({
          text,
          type,
          data,
          ...rest,
        });
      };
    }
  );

  [
    { name: methodPrefix('bulletList'), type: Node_Type.BULLETED_LIST },
    { name: methodPrefix('orderedList'), type: Node_Type.ORDERED_LIST },
  ].forEach(({ name, type }: { name: string; type: ListNode['type'] }) => {
    builderApis[name] = RicosContentBuilder.prototype[name] = function({
      items,
      data,
      ...rest
    }): RT {
      return listNodeCreator(generateId)({ items, data, type, ...rest });
    };
  });

  [
    { name: methodPrefix('divider'), type: Node_Type.DIVIDER, dataT: DEFAULT_DIVIDER_DATA },
    { name: methodPrefix('file'), type: Node_Type.FILE, dataT: {} as FileData },
    { name: methodPrefix('gallery'), type: Node_Type.GALLERY, dataT: {} as GalleryData },
    { name: methodPrefix('html'), type: Node_Type.HTML, dataT: DEFAULT_HTML_DATA },
    { name: methodPrefix('image'), type: Node_Type.IMAGE, dataT: {} as ImageData },
    { name: methodPrefix('video'), type: Node_Type.VIDEO, dataT: {} as VideoData },
    { name: methodPrefix('appEmbed'), type: Node_Type.APP_EMBED, dataT: {} as AppEmbedData },
    { name: methodPrefix('embed'), type: Node_Type.EMBED, dataT: {} as EmbedData },
    {
      name: methodPrefix('linkPreview'),
      type: Node_Type.LINK_PREVIEW,
      dataT: {} as LinkPreviewData,
    },
    { name: methodPrefix('button'), type: Node_Type.BUTTON, dataT: DEFAULT_BUTTON_DATA },
    { name: methodPrefix('gif'), type: Node_Type.GIF, dataT: {} as GIFData },
    { name: methodPrefix('map'), type: Node_Type.MAP, dataT: DEFAULT_MAP_DATA },
    { name: methodPrefix('poll'), type: Node_Type.POLL, dataT: DEFAULT_POLL_DATA },
  ].forEach(({ name, type, dataT }) => {
    builderApis[name] = RicosContentBuilder.prototype[name] = function({
      data = dataT,
      ...rest
    }): RT {
      return nodeCreator(generateId)({
        type,
        data,
        ...rest,
      });
    };
  });

  Object.entries({
    table: tableNodeCreator,
    collapsibleList: collapsibleListNodeCreator,
  }).forEach(
    ([name, method]) =>
      (builderApis[methodPrefix(name)] = RicosContentBuilder.prototype[methodPrefix(name)] = method(
        generateId
      ))
  );

  return builderApis;
};
