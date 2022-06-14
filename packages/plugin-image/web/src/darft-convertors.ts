import type { ImageData as DraftImageData, TiptapImageData } from './types';

export const draftBlockDataToTiptap = ({
  config,
  metadata,
  src,
  disableExpand,
  disableDownload,
}: DraftImageData): TiptapImageData => ({
  containerData: {
    alignment: config.alignment,
    width: { size: config.size },
    textWrap: !!config.textWrap,
    spoiler: config.spoiler,
  },
  link: config.link,
  disableExpand,
  disableDownload,
  caption: metadata?.caption,
  altText: metadata?.alt,
  image: {
    src: {
      id: src.id,
    },
    width: src.width,
    height: src.height,
  },
});

export const tiptapNodeDataToDraft = ({
  containerData,
  image,
  disableExpand,
  disableDownload,
  altText,
  caption,
  link,
}: TiptapImageData): DraftImageData => ({
  config: {
    alignment: containerData.alignment,
    size: containerData.width?.size,
    textWrap: containerData.textWrap ? 'wrap' : undefined,
    spoiler: containerData.spoiler,
    link,
  },
  disableExpand,
  disableDownload,
  metadata: {
    caption,
    alt: altText,
  },
  src: {
    id: image.src.id,
    file_name: image.src.id,
    width: image.width,
    height: image.height,
  },
});
