import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE, DIVIDER_TYPE, FILE_UPLOAD_TYPE, GALLERY_TYPE, GIPHY_TYPE, HTML_TYPE, IMAGE_TYPE, IMAGE_TYPE_LEGACY, LINK_PREVIEW_TYPE, MAP_TYPE, APP_EMBED_TYPE, VIDEO_TYPE, VIDEO_TYPE_LEGACY, POLL_TYPE, EMBED_TYPE, COLLAPSIBLE_LIST_TYPE, TABLE_TYPE } from '../../../consts';
import { ButtonData, DividerData, FileData, GalleryData, GIFData, HTMLData, LinkPreviewData, MapData, AppEmbedData, VideoData, PollData, ImageData, EmbedData, CollapsibleListData, TableData } from 'ricos-schema';
export declare const TO_RICOS_DATA: {
    "wix-draft-plugin-link-button": {
        fromJSON(object: any): ButtonData;
        toJSON(message: ButtonData): unknown;
    };
    "wix-draft-plugin-action-button": {
        fromJSON(object: any): ButtonData;
        toJSON(message: ButtonData): unknown;
    };
    "wix-draft-plugin-divider": {
        fromJSON(object: any): DividerData;
        toJSON(message: DividerData): unknown;
    };
    "wix-draft-plugin-file-upload": {
        fromJSON(object: any): FileData;
        toJSON(message: FileData): unknown;
    };
    "wix-draft-plugin-gallery": {
        fromJSON(object: any): GalleryData;
        toJSON(message: GalleryData): unknown;
    };
    "wix-draft-plugin-giphy": {
        fromJSON(object: any): GIFData;
        toJSON(message: GIFData): unknown;
    };
    "wix-draft-plugin-html": {
        fromJSON(object: any): HTMLData;
        toJSON(message: HTMLData): unknown;
    };
    "wix-draft-plugin-image": {
        fromJSON(object: any): ImageData;
        toJSON(message: ImageData): unknown;
    };
    IMAGE: {
        fromJSON(object: any): ImageData;
        toJSON(message: ImageData): unknown;
    };
    "wix-draft-plugin-link-preview": {
        fromJSON(object: any): LinkPreviewData;
        toJSON(message: LinkPreviewData): unknown;
    };
    "wix-draft-plugin-map": {
        fromJSON(object: any): MapData;
        toJSON(message: MapData): unknown;
    };
    "wix-draft-plugin-vertical-embed": {
        fromJSON(object: any): AppEmbedData;
        toJSON(message: AppEmbedData): unknown;
    };
    "wix-draft-plugin-video": {
        fromJSON(object: any): VideoData;
        toJSON(message: VideoData): unknown;
    };
    "VIDEO-EMBED": {
        fromJSON(object: any): VideoData;
        toJSON(message: VideoData): unknown;
    };
    "wix-draft-plugin-poll": {
        fromJSON(object: any): PollData;
        toJSON(message: PollData): unknown;
    };
    EMBED: {
        fromJSON(object: any): EmbedData;
        toJSON(message: EmbedData): unknown;
    };
    "wix-rich-content-plugin-collapsible-list": {
        fromJSON(object: any): CollapsibleListData;
        toJSON(message: CollapsibleListData): unknown;
    };
    "wix-rich-content-plugin-table": {
        fromJSON(object: any): TableData;
        toJSON(message: TableData): unknown;
    };
    EXTERNAL: {
        fromJSON(data: Record<string, any>): Record<string, any>;
    };
};
//# sourceMappingURL=consts.d.ts.map