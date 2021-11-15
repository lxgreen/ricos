import * as A from 'fp-ts/Array';
import { pipe } from 'fp-ts/function';
import * as M from 'fp-ts/Monoid';
import { fromNullable } from 'fp-ts/Option';
import { GalleryData, ImageData, Media, Node_Type, RichContent, VideoData } from 'ricos-schema';
import { RICOS_NODE_TYPE_TO_DATA_FIELD } from '../consts';
import { extract } from './extract';

export const getText = (content: RichContent): string[] =>
  extract(content.nodes)
    .map(({ textData }) => textData?.text || '')
    .get();

export const getPluginData = <T>(content: RichContent, type: Node_Type) =>
  extract(content.nodes)
    .map(node => node[RICOS_NODE_TYPE_TO_DATA_FIELD[type]])
    .get() as T[];

const MediaM = A.getMonoid<Media>();

export const getMedia = (content: RichContent): Media[] =>
  M.concatAll(MediaM)([
    pipe(
      getPluginData<ImageData>(content, Node_Type.IMAGE),
      A.map(({ image }) => image),
      A.map(fromNullable),
      A.compact
    ),
    pipe(
      getPluginData<VideoData>(content, Node_Type.VIDEO),
      A.map(({ video }) => video),
      A.map(fromNullable),
      A.compact
    ),
    pipe(
      getPluginData<GalleryData>(content, Node_Type.GALLERY),
      A.chain(({ items }) => items),
      A.map(({ image, video }) => image?.media || video?.media),
      A.map(fromNullable),
      A.compact
    ),
  ]);
