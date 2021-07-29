import {
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  DIVIDER_TYPE,
  FILE_UPLOAD_TYPE,
  GALLERY_TYPE,
  GIPHY_TYPE,
  HTML_TYPE,
  IMAGE_TYPE,
  IMAGE_TYPE_LEGACY,
  LINK_PREVIEW_TYPE,
  MAP_TYPE,
  APP_EMBED_TYPE,
  VIDEO_TYPE,
  VIDEO_TYPE_LEGACY,
  POLL_TYPE,
  EMBED_TYPE,
} from '../../../consts';
import {
  ButtonData,
  DividerData,
  FileData,
  GalleryData,
  GIFData,
  HTMLData,
  LinkPreviewData,
  MapData,
  AppEmbedData,
  VideoData,
  PollData,
  ImageData,
  EmbedData,
} from 'ricos-schema';

export const TO_RICOS_DATA = {
  [LINK_BUTTON_TYPE]: ButtonData,
  [ACTION_BUTTON_TYPE]: ButtonData,
  [DIVIDER_TYPE]: DividerData,
  [FILE_UPLOAD_TYPE]: FileData,
  [GALLERY_TYPE]: GalleryData,
  [GIPHY_TYPE]: GIFData,
  [HTML_TYPE]: HTMLData,
  [IMAGE_TYPE]: ImageData,
  [IMAGE_TYPE_LEGACY]: ImageData,
  [LINK_PREVIEW_TYPE]: LinkPreviewData,
  [MAP_TYPE]: MapData,
  [APP_EMBED_TYPE]: AppEmbedData,
  [VIDEO_TYPE]: VideoData,
  [VIDEO_TYPE_LEGACY]: VideoData,
  [POLL_TYPE]: PollData,
  [EMBED_TYPE]: EmbedData,
};
